import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("[EquiTrust] RESEND_API_KEY is not set. Email sending will fail.");
}

export const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy123456789");
