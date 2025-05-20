import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import add_document from '../../../../actions/add_document';

export async function POST(req) {
  const contentType = req.headers.get('content-type') || '';

  if (!contentType.includes('multipart/form-data')) {
    return new Response(JSON.stringify({ error: 'Очікується multipart/form-data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || file.type !== 'application/pdf') {
      return new Response(JSON.stringify({ error: 'Тільки PDF-файли дозволені' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    console.dir(formData)
    add_document(formData.get('name'), formData.get('author'), formData.get('description'), `/uploads/${fileName}`)

    return new Response(
      JSON.stringify({
        message: 'Файл збережено',
        document: {
          name: file.name,
          url: `/uploads/${fileName}`,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({ error: 'Помилка сервера при завантаженні' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

import { readdir } from 'fs/promises';

export async function GET() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    const files = await readdir(uploadDir);

    const pdfs = files
      .filter((name) => name.toLowerCase().endsWith('.pdf'))
      .map((name) => ({
        name,
        url: `/uploads/${name}`,
      }));

    return new Response(JSON.stringify(pdfs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('GET /api/upload error:', err);
    return new Response(JSON.stringify({ error: 'Не вдалося отримати список файлів' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
