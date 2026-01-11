'use client';

import { FileText, Download } from 'lucide-react';

interface NewsletterActionsProps {
  url: string;
}

export default function NewsletterActions({ url }: NewsletterActionsProps) {
  const isLocal = url.startsWith('/');
  const fullUrl = isLocal ? url : (url.startsWith('http') ? url : `https://${url}`);

  // Função para lidar com Visualização (Técnica 1 - Inline)
  const handleView = () => {
    const viewUrl = isLocal 
      ? `/api/download?url=${encodeURIComponent(url)}&mode=inline`
      : fullUrl;
    window.open(viewUrl, '_blank');
  };

  // Função para lidar com Download (Técnica 1, 2 e 3)
  const handleDownload = async () => {
    try {
      // Técnica 2: Web Share API (Principalmente para Mobile/iOS/Android)
      if (navigator.share && isLocal) {
        const response = await fetch(fullUrl);
        const blob = await response.blob();
        const fileName = url.split('/').pop() || 'newsletter.pdf';
        const file = new File([blob], fileName, { type: 'application/pdf' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Newsletter',
          });
          return; // Sucesso com Share API
        }
      }

      // Técnica 1 & 3: Fallback para Desktop ou links externos
      const downloadUrl = isLocal 
        ? `/api/download?url=${encodeURIComponent(url)}&mode=attachment`
        : fullUrl;

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = url.split('/').pop() || 'newsletter.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Falha no download:', error);
      // Fallback básico: abre o link original
      window.open(fullUrl, '_blank');
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <button 
        onClick={handleView}
        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-xl font-medium transition-colors"
      >
        <FileText className="w-4 h-4" />
        <span>Ver</span>
      </button>
      
      <button 
        onClick={handleDownload}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Baixar</span>
      </button>
    </div>
  );
}
