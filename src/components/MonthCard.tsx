import { Globe, Play, FileText } from 'lucide-react';
import Link from 'next/link';

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
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Globe className="w-5 h-5 text-gray-900" />
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-bold text-gray-900 whitespace-nowrap">{monthName}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600 truncate">{countries}</span>
        </div>
      </div>

      {/* Buttons Line */}
      <div className="flex flex-col sm:flex-row gap-3">
        {videoLink && (
          <a 
            href={videoLink.startsWith('http') ? videoLink : `https://${videoLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Baixar o vídeo</span>
          </a>
        )}
        
        {newsletterLink && (
          <a 
            href={newsletterLink.startsWith('http') ? newsletterLink : `https://${newsletterLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-xl font-medium transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Baixar a Newsletter</span>
          </a>
        )}
      </div>
    </div>
  );
}
