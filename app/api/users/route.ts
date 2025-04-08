import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function GET() {
  try {
    // Get all user IDs from the users set
    const userIds = await redis.smembers('users');
    
    // Get user details for each ID
    const users = await Promise.all(
      userIds.map(async (id) => {
        const user = await redis.hgetall(`user:${id}`);
        return {
          id,
          ...user,
        };
      })
    );

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}