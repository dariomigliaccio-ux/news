'use client';

import { FileText } from 'lucide-react';
import { useState } from 'react';

interface NewsletterActionsProps {
  url: string;
}

export default function NewsletterActions({ url }: NewsletterActionsProps) {
  const [loading, setLoading] = useState(false);

  // Debug: Log da URL recebida
  console.log('NewsletterActions - URL recebida:', url);

  // Visualizar PDF com iframe + footer
  const handleView = () => {
    setLoading(true);
    console.log('handleView - URL original:', url);
    const viewUrl = `/view?url=${encodeURIComponent(url)}`;
    console.log('handleView - URL de visualização:', viewUrl);

    setTimeout(() => setLoading(false), 1000);

    try {
      window.location.assign(viewUrl);
    } catch (error) {
      console.error('Erro ao abrir visualização:', error);
      window.location.href = viewUrl;
    }
  };

  return (
    <button
      onClick={handleView}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors active:scale-95"
    >
      <FileText className="w-4 h-4" />
      <span>{loading ? 'Abrindo...' : 'Ver Boletim'}</span>
    </button>
  );
}
