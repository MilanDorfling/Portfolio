import { Resend } from "resend";
import { NextResponse } from "next/server";

// ~~ Email sending logic using Resend API ~~

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email, message } = await req.json();

  const { data, error } = await resend.emails.send({
    from: ` ${name} from milandorfling.dev<onboarding@resend.dev>`,
    to: "milandorfling80@gmail.com",
    subject: `New message from ${name}`,
    html: `<p>${message}</p><p>From: ${email}</p>`,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

// ~~ Page routing logic for Next.js API route ~~

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb", // Limit request body size to 1MB
    },
  },
};
