import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, type } = body;

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: 'Телефон обязателен' },
        { status: 400 }
      );
    }

    // TODO: сохранить в БД (SQLite/Postgres), отправить в Telegram/email и т.д.
    console.log('[Lead]', { name: name || '', phone, message: message || '', type: type || 'form' });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
