import { NextRequest, NextResponse } from 'next/server';
import { Connection, Request, TYPES } from 'tedious';

const config = {
  server: (process.env.SQL_SERVER_HOST) as string,
  authentication: {
    type: 'default' as 'default',
    options: {
      userName: process.env.SQL_SERVER_USER,
      password: process.env.SQL_SERVER_PASSWORD,
    },
  },
  options: {
    port: parseInt(process.env.SQL_SERVER_PORT || '1433', 10),
    database: process.env.SQL_SERVER_DATABASE,
    trustServerCertificate: true,
  },
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;

  if (!productId) {
    return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
  }

  try {
    const connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Connection error:', err);
          reject(err);
        } else {
          console.log('Connected to SQL Server');
          resolve(null);
        }
      });
      connection.connect();
    });

    const result = await new Promise((resolve, reject) => {
      const request = new Request(
        'DELETE FROM products WHERE id = @id',
        (err, rowCount) => {
          if (err) {
            console.error('Query error:', err);
            reject(err);
          } else {
            resolve(rowCount);
          }
        }
      );

      request.addParameter('id', TYPES.UniqueIdentifier, productId);
      connection.execSql(request);
    });

    connection.close();

    if (result === 0) {
      return NextResponse.json({
        message: `Product with ID ${productId} not found`
      }, { status: 404 });
    }

    return NextResponse.json({
      message: `Product with ID ${productId} deleted successfully`
    }, { status: 200 });

  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    return NextResponse.json({
      error: `Failed to delete product with ID ${productId}`,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}