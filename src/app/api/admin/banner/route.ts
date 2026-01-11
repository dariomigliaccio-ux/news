import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, highlightedText, buttonLink, homeLink } = body;

    const banner = await prisma.banner.upsert({
      where: { id: 1 },
      update: { title, subtitle, highlightedText, buttonLink, homeLink },
      create: { id: 1, title, subtitle, highlightedText, buttonLink, homeLink }
    });

    console.log('BANNER_SAVED_ID_1:', banner);

    // Limpa o cache das páginas para mostrar os novos dados imediatamente
    revalidatePath('/', 'layout');
    revalidatePath('/');
    
    return NextResponse.json(banner);
  } catch (error) {
    console.error('BANNER_UPDATE_ERROR', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
