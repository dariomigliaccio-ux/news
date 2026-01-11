'use client';

import { FileText, Download } from 'lucide-react';
import { useState } from 'react';

interface NewsletterActionsProps {
  url: string;
}

export default function NewsletterActions({ url }: NewsletterActionsProps) {
  const [loading, setLoading] = useState(false);
  
  const isLocal = url.startsWith('/');

  // Visualizar PDF no navegador (inline)
  const handleView = () => {
    setLoading(true);
    const viewUrl = isLocal 
      ? `/api/download?url=${encodeURIComponent(url)}&mode=inline`
      : url.startsWith('http') ? url : `https://${url}`;
    
    window.open(viewUrl, '_blank');
    setLoading(false);
  };

  // Forçar Download do PDF (attachment)
  const handleDownload = () => {
    setLoading(true);
    const downloadUrl = isLocal 
      ? `/api/download?url=${encodeURIComponent(url)}&mode=attachment`
      : url.startsWith('http') ? url : `https://${url}`;
    
    // Deixa o navegador lidar com o header Content-Disposition
    window.location.href = downloadUrl;
    setLoading(false);
  };

  return (
    <div className="flex gap-2 w-full">
      <button 
        onClick={handleView}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 py-3 px-4 rounded-xl font-medium transition-colors active:scale-95"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">{loading ? 'Abrindo...' : 'Ver'}</span>
        <span className="inline sm:hidden">Ver</span>
      </button>
      
      <button 
        onClick={handleDownload}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors active:scale-95"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">{loading ? 'Baixando...' : 'Baixar'}</span>
        <span className="inline sm:hidden">Baixar</span>
      </button>
    </div>
  );
}
