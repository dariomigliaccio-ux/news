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

  // Função para Visualizar (abre no navegador)
  const handleView = () => {
    setLoading(true);
    try {
      const viewUrl = isLocal 
        ? `/api/download?url=${encodeURIComponent(url)}&mode=inline`
        : fullUrl;
      window.open(viewUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erro ao visualizar:', error);
      alert('Erro ao abrir o arquivo');
    } finally {
      setLoading(false);
    }
  };

  // Função para Baixar (force download em todos os dispositivos)
  const handleDownload = () => {
    setLoading(true);
    try {
      // Para arquivos locais, usar API com modo attachment
      // Para links externos, abrir em nova aba (será tratado pelo navegador)
      const downloadUrl = isLocal 
        ? `/api/download?url=${encodeURIComponent(url)}&mode=attachment`
        : fullUrl;

      // Método universal: criar elemento, adicionar ao DOM, clicar e remover
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = fileName;
      downloadLink.setAttribute('target', '_blank');
      downloadLink.setAttribute('rel', 'noopener noreferrer');
      downloadLink.style.display = 'none';
      
      document.body.appendChild(downloadLink);
      
      // Aguarda a renderização do elemento antes de clicar
      requestAnimationFrame(() => {
        downloadLink.click();
      });
      
      // Remove após o clique ser processado
      setTimeout(() => {
        if (downloadLink.parentNode) {
          document.body.removeChild(downloadLink);
        }
      }, 500);
      
    } catch (error) {
      console.error('Erro no download:', error);
      // Fallback: abre o arquivo em nova aba
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(false);
    }
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
        <span className="inline sm:hidden">{loading ? '...' : 'Ver'}</span>
      </button>
      
      <button 
        onClick={handleDownload}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors active:scale-95"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">{loading ? 'Baixando...' : 'Baixar'}</span>
        <span className="inline sm:hidden">{loading ? '...' : 'Baixar'}</span>
      </button>
    </div>
  );
}
