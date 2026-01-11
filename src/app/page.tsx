import prisma from '@/lib/prisma';
import Banner from '@/components/Banner';
import MonthCard from '@/components/MonthCard';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const FALLBACK_BANNER = {
  title: "País do Mês e Newsletter",
  subtitle: "Assembly of God Bethlehem Ministry",
  highlightedText: "Missão urgente",
  buttonLink: "https://www.missaobelem.com.br",
  homeLink: "https://adbelem.us"
};

interface BannerData {
  title: string;
  subtitle: string;
  highlightedText: string;
  buttonLink: string;
  homeLink: string;
}

interface MonthData {
  id: number;
  monthName: string;
  countries: string;
  videoLink: string | null;
  newsletterLink: string | null;
  isActive: boolean;
}

export default async function Home() {
  let banner: BannerData | null = null;
  let months: MonthData[] = [];

  try {
    banner = await prisma.banner.findUnique({
      where: { id: 1 }
    }) as BannerData | null;
    
    const dbMonths = await prisma.monthItem.findMany({
      orderBy: { monthIndex: 'asc' }
    });
    months = dbMonths as MonthData[];

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Database connection error:", error);
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="bg-white border-2 border-red-500 p-8 rounded-3xl max-w-lg shadow-xl text-center">
          <h2 className="text-red-600 text-2xl font-bold mb-4">Atenção: Erro de Configuração</h2>
          <p className="text-gray-600 mb-6">
            O site não conseguiu se conectar ao banco de dados da GoDaddy. 
          </p>
          <div className="bg-gray-100 p-4 rounded-xl text-left">
            <p className="text-xs font-mono text-gray-500 mb-2">DETALHES TÉCNICOS:</p>
            <p className="text-sm font-bold text-red-500 break-words">
              {errorMessage}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const displayBanner = banner || FALLBACK_BANNER;
  const activeMonths = months.filter((m) => 
    m.isActive && (m.countries?.trim() || m.videoLink || m.newsletterLink)
  );
  
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        <Banner 
          title={displayBanner.title}
          subtitle={displayBanner.subtitle}
          highlightedText={displayBanner.highlightedText}
          buttonLink={displayBanner.buttonLink || "#"}
          homeLink={displayBanner.homeLink || "https://adbelem.us"}
        />

        <div className="space-y-4">
          {activeMonths.length > 0 ? (
            activeMonths.map((month) => (
              <MonthCard 
                key={month.id}
                monthName={month.monthName}
                countries={month.countries}
                videoLink={month.videoLink || undefined}
                newsletterLink={month.newsletterLink || undefined}
              />
            ))
          ) : (
            <div className="text-center py-10">
                <p className="text-gray-400 italic">Nenhum país configurado para o mês atual.</p>
                <div className="mt-4 text-[10px] text-gray-300 font-mono">
                  DB: OK | Total: {months.length}
                </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Assembleia de Deus Ministério Belém
        </footer>
      </div>
    </main>
  );
}
