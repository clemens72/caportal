import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  try {
    // Delete user hash
    const deleted = await redis.del(`user:${userId}`);

    // Remove user ID from users set
    await redis.srem('users', userId);

    if (deleted) {
      return NextResponse.json({
        message: `User with ID ${userId} deleted successfully`
      }, { status: 200 });
    } else {
      return NextResponse.json({
        message: `User with ID ${userId} not found`
      }, { status: 404 });
    }

  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    return NextResponse.json({
      error: `Failed to delete user with ID ${userId}`,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}