import prisma from '@/lib/prisma';
import Banner from '@/components/Banner';
import MonthCard from '@/components/MonthCard';
import { MonthItem } from '@prisma/client';

const FALLBACK_BANNER = {
  title: "País do Mês e Newsletter",
  subtitle: "Assembly of God Bethlehem Ministry",
  highlightedText: "Missão urgente",
  buttonLink: "https://www.missaobelem.com.br"
};

const MONTHS_DEFAULT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default async function Home() {
  let banner = null;
  let months: MonthItem[] = [];

  try {
    banner = await prisma.banner.findFirst();
    months = await prisma.monthItem.findMany({
      orderBy: { monthIndex: 'asc' }
    });
  } catch (error) {
    console.error("Database error:", error);
  }

  const displayBanner = banner || FALLBACK_BANNER;
  
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        <Banner 
          title={displayBanner.title}
          subtitle={displayBanner.subtitle}
          highlightedText={displayBanner.highlightedText}
          buttonLink={displayBanner.buttonLink}
        />

        <div className="space-y-4">
          {months.length > 0 ? (
            months.filter(m => m.isActive).map((month) => (
              <MonthCard 
                key={month.id}
                monthName={month.monthName}
                countries={month.countries}
                videoLink={month.videoLink || undefined}
                newsletterLink={month.newsletterLink || undefined}
              />
            ))
          ) : (
            MONTHS_DEFAULT.map((m, i) => (
              <MonthCard 
                key={i}
                monthName={m}
                countries="Para configurar, acesse o painel admin"
                videoLink="#"
                newsletterLink="#"
              />
            ))
          )}
        </div>

        <footer className="mt-12 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Assembleia de Deus Ministério Belém
        </footer>
      </div>
    </main>
  );
}
