import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { monthIndex, countries, videoLink, newsletterLink, isActive } = body;

    const month = await prisma.monthItem.update({
      where: { monthIndex },
      data: { countries, videoLink, newsletterLink, isActive }
    });

    return NextResponse.json(month);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
