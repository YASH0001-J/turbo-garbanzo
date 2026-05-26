import { NextResponse } from 'next/server';

export function jsonSuccess<T>(data: T, message = 'Success', status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function jsonInternalError(err?: unknown) {
  const devMessage =
    process.env.NODE_ENV !== 'production' && err instanceof Error ? err.message : 'Internal server error';
  return jsonError(devMessage, 500);
}
