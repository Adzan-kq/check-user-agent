import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    const link = `${process.env.NEXT_PUBLIC_SITE_URL}`;

    await resend.emails.send({
      from: "Test <onboarding@resend.dev>",
      to: email,
      subject: "Cek User Agent Anda",
      html: `
        <h2>Check User Agent</h2>
        <p>Klik link berikut untuk melihat User Agent Anda:</p>
        <a href="${link}">${link}</a>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
