import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = process.env.RESEND_API_KEY || '';
    const fromAddress = process.env.RESEND_FROM || 'StaySphere <StaySphere@cybelinx.com>';

    const resend = new Resend(apiKey);

    const { to, subject, html, text } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters (to, subject, html)' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      from: fromAddress,
      to,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Resend dispatch error' },
      { status: 500 }
    );
  }
}
