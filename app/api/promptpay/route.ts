// app/api/promptpay/route.ts
import { NextResponse } from "next/server";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const phone = body.phone;
    const amount = Number(body.amount);

    if (!phone || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "invalid payload" },
        { status: 400 }
      );
    }

    const payload = generatePayload(phone, { amount });

    const qr = await new Promise<string>((resolve, reject) => {
      QRCode.toDataURL(payload, (err, url) => {
        if (err) reject(err);
        else resolve(url);
      });
    });

    return NextResponse.json({ qr });
  } catch (err) {
    console.error("PromptPay API error:", err);
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}