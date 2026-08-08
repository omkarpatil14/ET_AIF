import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  message: string;
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim().slice(0, 2000);
}

function buildEmailHtml(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Investor Enquiry — EquiTrust</title>
</head>
<body style="margin:0;padding:0;background:#0a0b0d;font-family:Inter,Helvetica,Arial,sans-serif;color:#f5f1e8;">
  <div style="max-width:600px;margin:40px auto;background:#0f1114;border:0.5px solid rgba(255,255,255,0.08);border-radius:6px;overflow:hidden;">
    
    <!-- Header -->
    <div style="padding:32px 36px 24px;border-bottom:0.5px solid rgba(255,255,255,0.06);">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#2ec47f;">
        EquiTrust — Category III AIF
      </p>
      <h1 style="margin:0;font-size:22px;font-weight:400;letter-spacing:-0.02em;color:#f5f1e8;">
        New Investor Enquiry
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:28px 36px;">
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["Name", data.name],
          ["Email", data.email],
          ["Phone", data.phone || "Not provided"],
          ["Company / Organisation", data.company || "Not provided"],
          ["Investment Interest", data.interest || "Not specified"],
        ]
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:0.5px solid rgba(255,255,255,0.05);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#606878;width:40%;vertical-align:top;padding-right:20px;">
              ${label}
            </td>
            <td style="padding:10px 0;border-bottom:0.5px solid rgba(255,255,255,0.05);font-size:14px;color:#f5f1e8;vertical-align:top;">
              ${value}
            </td>
          </tr>`
          )
          .join("")}
      </table>

      <!-- Message -->
      <div style="margin-top:24px;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#606878;">
          Message
        </p>
        <div style="background:#161a1f;border:0.5px solid rgba(255,255,255,0.06);border-radius:4px;padding:16px;font-size:14px;line-height:1.6;color:#a8b0bc;">
          ${data.message.replace(/\n/g, "<br>")}
        </div>
      </div>

      <!-- CTA -->
      <div style="margin-top:28px;text-align:center;">
        <a href="mailto:${data.email}"
           style="display:inline-block;padding:10px 24px;background:#0d8f54;color:#f5f1e8;text-decoration:none;font-size:13px;letter-spacing:0.04em;border-radius:3px;border:0.5px solid #2ec47f;">
          Reply to ${data.name} →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:20px 36px;border-top:0.5px solid rgba(255,255,255,0.06);">
      <p style="margin:0;font-size:11px;color:#464d5c;line-height:1.5;">
        This enquiry was submitted via the EquiTrust investor enquiry form at equitrustsolutions.com.
        Respond in confidence.
      </p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, phone, company, interest, message } = body as ContactPayload;

    // Validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Full name is required.";
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "A valid email address is required.";
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      errors.message = "A message is required.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Validation failed.", errors }, { status: 422 });
    }

    // Sanitize
    const sanitized: ContactPayload = {
      name: sanitize(String(name)),
      email: sanitize(String(email)),
      phone: phone ? sanitize(String(phone)) : undefined,
      company: company ? sanitize(String(company)) : undefined,
      interest: interest ? sanitize(String(interest)) : undefined,
      message: sanitize(String(message)),
    };

    const toEmail = process.env.CONTACT_EMAIL;
    if (!toEmail) {
      console.error("[EquiTrust] CONTACT_EMAIL env var is not set.");
      return NextResponse.json(
        { message: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "EquiTrust Website <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: sanitized.email,
      subject: `New Investor Enquiry — EquiTrust Website`,
      html: buildEmailHtml(sanitized),
    });

    if (error) {
      console.error("[EquiTrust] Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send enquiry. Please try again or email us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Enquiry received successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[EquiTrust] Unexpected error in contact route:", err);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
