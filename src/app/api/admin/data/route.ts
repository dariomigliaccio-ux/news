import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const MONTHS_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export async function GET() {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Reset logic
    let config = await prisma.globalConfig.findFirst();
    if (!config) {
      config = await prisma.globalConfig.create({
        data: { id: 1, currentYear }
      });
    } else if (config.currentYear !== currentYear) {
      // Automatic Reset: Year changed!
      await prisma.monthItem.updateMany({
        data: {
          countries: "",
          videoLink: null,
          newsletterLink: null,
          isActive: true
        }
      });
      await prisma.globalConfig.update({
        where: { id: 1 },
        data: { currentYear }
      });
    }

    let banner = await prisma.banner.findFirst();
    if (!banner) {
      banner = await prisma.banner.create({
        data: {
          title: "País do Mês e Newsletter",
          subtitle: "Assembly of God Bethlehem Ministry",
          highlightedText: "Missão urgente",
          buttonLink: "#"
        }
      });
    }

    let months = await prisma.monthItem.findMany({
      orderBy: { monthIndex: 'asc' }
    });

    if (months.length === 0) {
      const initialMonths = MONTHS_NAMES.map((name, index) => ({
        monthIndex: index,
        monthName: name,
        countries: "",
        isActive: true
      }));
      
      await prisma.monthItem.createMany({
        data: initialMonths
      });
      
      months = await prisma.monthItem.findMany({
        orderBy: { monthIndex: 'asc' }
      });
    }

    return NextResponse.json({ banner, months, currentYear });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
