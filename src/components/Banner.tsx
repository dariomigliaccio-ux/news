import { Globe, ArrowUpRight, Home } from 'lucide-react';

interface BannerProps {
  title: string;
  subtitle: string;
  highlightedText: string;
  buttonLink: string;
  homeLink: string;
}

export default function Banner({ title, subtitle, highlightedText, buttonLink, homeLink }: BannerProps) {
  return (
    <div className="relative bg-white rounded-3xl shadow-sm p-8 md:p-12 text-center max-w-4xl mx-auto mb-8">
      {/* Home button on the top left */}
      <a 
        href={homeLink.startsWith('http') ? homeLink : `https://${homeLink}`}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full transition-all border border-gray-100 shadow-sm text-sm font-medium"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </a>

      {/* Top Globe Icon */}
      <div className="flex justify-center mb-6 mt-8 sm:mt-0">
        <div className="p-3 bg-gray-50 rounded-full">
          <Globe className="w-8 h-8 text-gray-900" />
        </div>
      </div>

      {/* Admin configurable button on the top right */}
      <a 
        href={buttonLink === '#' ? '#' : (buttonLink.startsWith('http') ? buttonLink : `https://${buttonLink}`)}
        target={buttonLink === '#' ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
      >
        <ArrowUpRight className="w-5 h-5 text-gray-700" />
      </a>

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
