import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get('url');
  const mode = searchParams.get('mode') || 'inline'; // 'inline' ou 'attachment'

  if (!fileUrl) {
    return new Response('URL não fornecida', { status: 400 });
  }

  // Técnica 1: Headers HTTP para arquivos locais (na pasta public)
  if (fileUrl.startsWith('/')) {
    try {
      const filename = path.basename(fileUrl);
      const filePath = path.join(process.cwd(), 'public', fileUrl);
      const fileBuffer = await fs.readFile(filePath);

      const headers = new Headers();
      headers.set('Content-Type', 'application/pdf');
      // Define se vai abrir no navegador (inline) ou baixar (attachment)
      headers.set('Content-Disposition', `${mode}; filename="${filename}"`);

      return new NextResponse(fileBuffer, { headers });
    } catch (error) {
      console.error('Erro ao ler arquivo:', error);
      return new Response('Arquivo não encontrado no servidor', { status: 404 });
    }
  }

  // Se for link externo, redireciona (não temos controle sobre os headers de terceiros)
  return NextResponse.redirect(fileUrl);
}
