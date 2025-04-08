import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // Get user ID from username
    const userId = await redis.get(`username:${username}`);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Get user data
    const user = await redis.hgetall(`user:${userId}`);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, String(user.password));
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      id: userId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}