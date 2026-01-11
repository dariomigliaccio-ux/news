import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { monthIndex, countries, videoLink, newsletterLink, isActive } = body;

    const month = await prisma.monthItem.update({
      where: { monthIndex },
      data: { countries, videoLink, newsletterLink, isActive }
    });

    console.log('MONTH_SAVED_INDEX:', monthIndex, month);

    revalidatePath('/', 'layout');
    revalidatePath('/');
    return NextResponse.json(month);
  } catch (error) {
    console.error('MONTH_UPDATE_ERROR', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
