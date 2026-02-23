// lib/promptpay.ts
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

/**
 * สร้าง PromptPay QR แบบฝังยอดเงิน
 */
export async function generatePromptPayQR(
  promptPayId: string, // เบอร์ร้าน
  amount: number       // ยอดเงิน
): Promise<string> {
  const payload = generatePayload(promptPayId, { amount });
  return await QRCode.toDataURL(payload);
}