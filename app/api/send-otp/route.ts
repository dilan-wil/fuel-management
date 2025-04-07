// app/api/send-code/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ message: "Email and code are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: "eva@onevisaplace.com",
          pass: "lionzNrul3zzzz.",
        },
    });

    const mailOptions = {
      from: `"Gas Finder App" <eva@onevisaplace.com>`,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ message: 'Email failed to send' }, { status: 500 });
  }
}
