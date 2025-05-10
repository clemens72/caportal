import { NextResponse } from 'next/server';
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

export async function GET() {
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

    // For now, return a mock user since we don't have authentication set up yet
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      active: true
    };

    connection.close();

    return NextResponse.json(mockUser);

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({
      error: 'Failed to fetch user details',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 