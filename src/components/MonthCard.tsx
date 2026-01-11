import { Globe, Play } from 'lucide-react';
import NewsletterActions from './NewsletterActions';

interface MonthCardProps {
  monthName: string;
  countries: string;
  videoLink?: string;
  newsletterLink?: string;
}

export default function MonthCard({ monthName, countries, videoLink, newsletterLink }: MonthCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-100 transition-all hover:shadow-md">
      {/* Upper Line */}
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg shrink-0">
          <Globe className="w-5 h-5 text-gray-900" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-gray-900 text-lg leading-tight">{monthName}</span>
          <span className="text-gray-600 text-sm">{countries}</span>
        </div>
      </div>

      {/* Buttons Line */}
      <div className="flex flex-col sm:flex-row gap-3">
        {videoLink && (
          <a 
            href={videoLink.startsWith('http') || videoLink.startsWith('/') ? videoLink : `https://${videoLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Baixar o vídeo</span>
          </a>
        )}
        
        {newsletterLink && (
          <div className="flex-1">
            <NewsletterActions url={newsletterLink} />
          </div>
        )}
      </div>
    </div>
  );
}
