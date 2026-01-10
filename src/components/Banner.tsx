import { Globe, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface BannerProps {
  title: string;
  subtitle: string;
  highlightedText: string;
  buttonLink: string;
}

export default function Banner({ title, subtitle, highlightedText, buttonLink }: BannerProps) {
  return (
    <div className="relative bg-white rounded-3xl shadow-sm p-8 md:p-12 text-center max-w-4xl mx-auto mb-8">
      {/* Top Globe Icon */}
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-gray-50 rounded-full">
          <Globe className="w-8 h-8 text-gray-900" />
        </div>
      </div>

      {/* Admin configurable button */}
      <Link 
        href={buttonLink}
        target="_blank"
        className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
      >
        <ArrowUpRight className="w-5 h-5 text-gray-700" />
      </Link>

      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      
      <p className="text-gray-500 text-sm md:text-base mb-6 font-medium">
        {subtitle}
      </p>

      <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider">
        {highlightedText}
      </div>
    </div>
  );
}
