'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import { Suspense, useState } from 'react';

function ViewPDFContent() {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get('url');
  const [debugMessage, setDebugMessage] = useState('');

  console.log('ViewPDFContent - URL recebida:', pdfUrl);

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Nenhum arquivo selecionado</p>
        </div>
      </div>
    );
  }

  // Normaliza a URL
  let fullPdfUrl = pdfUrl;

  // Se for caminho local, usa a API de download
  if (pdfUrl.startsWith('/')) {
    fullPdfUrl = `/api/download?url=${encodeURIComponent(pdfUrl)}&mode=inline`;
  }
  // Se não começar com http, adiciona https://
  else if (!pdfUrl.startsWith('http')) {
    fullPdfUrl = `https://${pdfUrl}`;
  }
  // Se for URL externa, usa Google Docs Viewer para renderizar (funciona melhor com URLs externas)
  if (pdfUrl.startsWith('http')) {
    fullPdfUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  }

  console.log('ViewPDFContent - URL completa do iframe:', fullPdfUrl);

  const handleDownload = () => {
    setDebugMessage('Iniciando download...');
    console.log('=== INÍCIO DO DOWNLOAD ===');
    console.log('handleDownload - URL original:', pdfUrl);

    if (!pdfUrl) {
      setDebugMessage('ERRO: URL vazia!');
      alert('Erro: URL do PDF não está disponível');
      return;
    }

    // Abre a URL original do PDF em nova aba para download
    const downloadUrl = pdfUrl.startsWith('http') ? pdfUrl : `https://${pdfUrl}`;
    setDebugMessage(`Abrindo: ${downloadUrl.substring(0, 50)}...`);

    try {
      // Usa window.location para abrir em apps mobile
      window.location.href = downloadUrl;
      setDebugMessage('✓ Redirecionando...');
    } catch (error) {
      console.error('ERRO ao tentar download:', error);
      setDebugMessage(`ERRO: ${error}`);
      alert(`Erro ao abrir PDF: ${error}`);
    }

    // Limpa mensagem após 3 segundos
    setTimeout(() => setDebugMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* PDF dentro do iframe - ocupa espaço disponível menos o footer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={fullPdfUrl}
          className="w-full h-full border-none"
          title="PDF Viewer"
          allow="fullscreen"
        />
      </div>

      {/* Mensagem de debug (visível no mobile) */}
      {debugMessage && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-3 text-xs z-50">
          <p className="font-mono">{debugMessage}</p>
        </div>
      )}

      {/* Footer SEMPRE FIXO embaixo com botões */}
      <footer className="flex-shrink-0 border-t border-gray-200 bg-white p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-stretch sm:items-center shadow-lg z-50">
        <button
          onClick={() => {
            // Redireciona para home usando window.location.assign (melhor para apps)
            try {
              window.location.assign('/');
            } catch (error) {
              console.error('Erro ao voltar:', error);
              window.location.href = '/';
            }
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Voltar para Home</span>
        </button>

        <button
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors active:scale-95 shadow-md"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Baixar PDF</span>
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
