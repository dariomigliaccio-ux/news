import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { basename, join } from 'path';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get('url');
  const mode = searchParams.get('mode') || 'inline';

  if (!fileUrl) {
    return NextResponse.json({ error: 'URL não fornecida' }, { status: 400 });
  }

  // Se for link externo, apenas redireciona
  if (fileUrl.startsWith('http')) {
    return NextResponse.redirect(fileUrl);
  }

  // Para arquivos locais na pasta public
  if (fileUrl.startsWith('/')) {
    try {
      const filename = basename(fileUrl);
      const filePath = join(process.cwd(), 'public', fileUrl);
      const fileBuffer = await readFile(filePath);

      const headers = new Headers();
      headers.set('Content-Type', 'application/pdf');
      headers.set('Content-Disposition', `${mode}; filename="${filename}"`);
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error('Erro ao ler arquivo:', error);
      return NextResponse.json(
        { error: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }
  }

  return NextResponse.json({ error: 'URL inválida' }, { status: 400 });
}
