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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
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

    const user = await new Promise((resolve, reject) => {
      let result: any = null;
      const request = new Request(
        `SELECT id, username, first_name, last_name, created_at 
         FROM users 
         WHERE id = @id`,
        (err) => {
          if (err) {
            console.error('Query error:', err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );

      request.addParameter('id', TYPES.UniqueIdentifier, userId);

      request.on('row', (columns) => {
        result = {};
        columns.forEach((column: { metadata: { colName: string }; value: any }) => {
          result[column.metadata.colName] = column.value;
        });
      });

      connection.execSql(request);
    });

    connection.close();

    if (!user) {
      return NextResponse.json(
        { error: `User with ID ${userId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return NextResponse.json({
      error: `Failed to fetch user with ID ${userId}`,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  try {
    const connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Connection error:', err);
          reject(err);
        } else {
          console.log('Connected to SQL Server for user deletion');
          resolve(null);
        }
      });

      connection.connect();
    });

    const sql = `
      DELETE FROM [dbo].[users]
      WHERE id = @id
    `;

    const rowsAffected = await new Promise<number>((resolve, reject) => {
      const requestTedious = new Request(sql, (err, rowCount) => {
        if (err) {
          console.error('Delete error:', err);
          reject(err);
        } else {
          console.log(`User with ID ${userId} deleted successfully`);
          resolve(rowCount ?? 0);
        }
      });

      requestTedious.addParameter('id', TYPES.Char, userId);

      connection.execSql(requestTedious);
    });

    connection.close();

    if (rowsAffected > 0) {
      return NextResponse.json({ message: `User with ID ${userId} deleted successfully` }, { status: 200 });
    } else {
      return NextResponse.json({ message: `User with ID ${userId} not found` }, { status: 404 });
    }

  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    return NextResponse.json({ error: `Failed to delete user with ID ${userId}`, details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}