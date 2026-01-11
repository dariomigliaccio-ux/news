'use client';

import { FileText, Download } from 'lucide-react';
import { useState } from 'react';

interface NewsletterActionsProps {
  url: string;
}

export default function NewsletterActions({ url }: NewsletterActionsProps) {
  const [loading, setLoading] = useState(false);
  
  const isLocal = url.startsWith('/');
  const fullUrl = isLocal ? url : (url.startsWith('http') ? url : `https://${url}`);
  const fileName = url.split('/').pop() || 'newsletter.pdf';

  // Função para lidar com Visualização (Técnica 1 - Inline)
  const handleView = async () => {
    setLoading(true);
    try {
      const viewUrl = isLocal 
        ? `/api/download?url=${encodeURIComponent(url)}&mode=inline`
        : fullUrl;
      window.open(viewUrl, '_blank');
    } catch (error) {
      console.error('Erro ao abrir:', error);
      alert('Erro ao abrir o arquivo');
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com Download (Técnica 1, 2 e 3)
  const handleDownload = async () => {
    setLoading(true);
    try {
      // Técnica 2: Web Share API para Mobile
      if (navigator.share && isLocal) {
        try {
          const response = await fetch(fullUrl);
          const blob = await response.blob();
          const file = new File([blob], fileName, { type: 'application/pdf' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Newsletter',
            });
            return;
          }
        } catch (shareError) {
          console.log('Web Share não disponível, usando fallback');
        }
      }

      // Técnica 1 & 3: Fallback para Desktop ou links externos
      const downloadUrl = isLocal 
        ? `/api/download?url=${encodeURIComponent(url)}&mode=attachment`
        : fullUrl;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Aguarda um pouco antes de remover
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      console.error('Erro no download:', error);
      window.open(fullUrl, '_blank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <button 
        onClick={handleView}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 py-3 px-4 rounded-xl font-medium transition-colors"
      >
        <FileText className="w-4 h-4" />
        <span>{loading ? '...' : 'Ver'}</span>
      </button>
      
      <button 
        onClick={handleDownload}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>{loading ? '...' : 'Baixar'}</span>
      </button>
    </div>
  );
}
