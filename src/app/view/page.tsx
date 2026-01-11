'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function ViewPDFContent() {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get('url');

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Nenhum arquivo selecionado</p>
        </div>
      </div>
    );
  }

  const fullPdfUrl = pdfUrl.startsWith('/') 
    ? `/api/download?url=${encodeURIComponent(pdfUrl)}&mode=inline`
    : pdfUrl.startsWith('http') 
    ? pdfUrl 
    : `https://${pdfUrl}`;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* PDF dentro do iframe - ocupa todo espaço disponível */}
      <iframe 
        src={fullPdfUrl}
        className="flex-1 w-full border-none"
        title="PDF Viewer"
      />

      {/* Footer fixo embaixo */}
      <footer className="border-t border-gray-200 bg-white p-3 sm:p-4">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Voltar</span>
        </button>
      </footer>
    </div>
  );
}

export default function ViewPDF() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
      <ViewPDFContent />
    </Suspense>
  );
}
