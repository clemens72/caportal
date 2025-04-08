import { NextResponse, NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Create test user if it doesn't exist
async function ensureTestUser() {
  const testUsername = 'admin';
  const testPassword = '$2b$10$Se5BtTmsZ6QFm4HULjdCSei9lYHVOrcpBZGZQK33DyHd4mgtQdp06';
  
  // Check if test user exists
  const existingId = await redis.get(`username:${testUsername}`);
  if (!existingId) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const createdAt = new Date().toISOString();

    // Create test user
    await redis.hset(`user:${id}`, {
      username: testUsername,
      firstName: 'Test',
      lastName: 'Admin',
      password: hashedPassword,
      createdAt,
      lastModification: createdAt,
      enabled: '1'
    });

    await redis.sadd('users', id);
    await redis.set(`username:${testUsername}`, id);
    
    console.log('Test user created');
  }
}

// Create test user on startup
ensureTestUser().catch(console.error);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, firstName, lastName, password } = body;

    if (!username || !firstName || !lastName || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if username already exists
    const existingId = await redis.get(`username:${username}`);
    if (existingId) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    // Create user hash
    await redis.hset(`user:${id}`, {
      username,
      firstName,
      lastName,
      password: hashedPassword,
      createdAt,
      lastModification: createdAt,
      enabled: '1'
    });

    // Add user ID to users set
    await redis.sadd('users', id);

    // Create username to ID mapping for login
    await redis.set(`username:${username}`, id);

    return NextResponse.json({ 
      message: 'User created successfully', 
      userId: id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ 
      error: 'Failed to create user', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}