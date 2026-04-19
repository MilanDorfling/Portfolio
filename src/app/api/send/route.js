import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY" },
      { status: 500 },
    );
  }

  const { data, error } = await resend.emails.send({
    from: `${name} from milandorfling.dev <onboarding@resend.dev>`,
    to: "milandorfling80@gmail.com",
    subject: `New message from ${name}`,
    html: `<p>${message}</p><p>From: ${email}</p>`,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export const maxRequestBodySize = "1mb";
