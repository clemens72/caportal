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
  const { id: eventId } = await params;

  if (!eventId) {
    return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
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

    const event = await new Promise((resolve, reject) => {
      let result: any = null;
      const request = new Request(
        `SELECT id, name, price, leader, location, start_time, end_time, description, booking_contact 
         FROM events 
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

      request.addParameter('id', TYPES.UniqueIdentifier, eventId);

      request.on('row', (columns) => {
        result = {};
        columns.forEach((column: { metadata: { colName: string }; value: any }) => {
          result[column.metadata.colName] = column.value;
        });
      });

      connection.execSql(request);
    });

    connection.close();

    if (!event) {
      return NextResponse.json(
        { error: `Event with ID ${eventId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(event);

  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    return NextResponse.json({
      error: `Failed to fetch event with ID ${eventId}`,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await params;

  if (!eventId) {
    return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
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
        'DELETE FROM events WHERE id = @id',
        (err, rowCount) => {
          if (err) {
            console.error('Query error:', err);
            reject(err);
          } else {
            resolve(rowCount);
          }
        }
      );

      request.addParameter('id', TYPES.UniqueIdentifier, eventId);
      connection.execSql(request);
    });

    connection.close();

    if (result === 0) {
      return NextResponse.json({
        message: `Event with ID ${eventId} not found`
      }, { status: 404 });
    }

    return NextResponse.json({
      message: `Event with ID ${eventId} deleted successfully`
    }, { status: 200 });

  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    return NextResponse.json({
      error: `Failed to delete event with ID ${eventId}`,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}