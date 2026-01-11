'use client';

import { FileText, Download } from 'lucide-react';
import { useState } from 'react';

interface NewsletterActionsProps {
  url: string;
}

export default function NewsletterActions({ url }: NewsletterActionsProps) {
  const [loading, setLoading] = useState(false);

  // Visualizar PDF com iframe + footer
  const handleView = () => {
    setLoading(true);
    const viewUrl = `/view?url=${encodeURIComponent(url)}`;

    setTimeout(() => setLoading(false), 1000);

    try {
      window.location.assign(viewUrl);
    } catch (error) {
      console.error('Erro ao abrir visualização:', error);
      window.location.href = viewUrl;
    }
  };

  // Forçar Download do PDF
  const handleDownload = () => {
    setLoading(true);

    try {
      const downloadUrl = url.startsWith('/')
        ? `/api/download?url=${encodeURIComponent(url)}&mode=attachment`
        : url.startsWith('http') ? url : `https://${url}`;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = url.split('/').pop() || 'newsletter.pdf';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setLoading(false), 1000);

    } catch (error) {
      console.error('Erro ao baixar:', error);
      const downloadUrl = url.startsWith('/')
        ? `/api/download?url=${encodeURIComponent(url)}&mode=attachment`
        : url;
      window.open(downloadUrl, '_blank');
      setTimeout(() => setLoading(false), 1000);
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
