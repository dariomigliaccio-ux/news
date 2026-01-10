import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, highlightedText, buttonLink } = body;

    const banner = await prisma.banner.upsert({
      where: { id: 1 },
      update: { title, subtitle, highlightedText, buttonLink },
      create: { id: 1, title, subtitle, highlightedText, buttonLink }
    });

    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
