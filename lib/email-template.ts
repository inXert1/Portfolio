/**
 * Styled HTML email template matching the portfolio's visual identity.
 * Theme: warm cream (#FFF8F0) light / dark forest (#1C2120) dark.
 * Typography: Inter for body, system fallbacks for headings.
 */

interface EmailTemplateProps {
  senderName: string;
  senderEmail: string;
  message: string;
}

export function buildEmailHtml({ senderName, senderEmail, message }: EmailTemplateProps): string {
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });

  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Message from ${senderName}</title>
</head>
<body style="margin:0;padding:0;background-color:#FFF8F0;font-family:'Inter','Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFF8F0;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;gap:8px;background-color:#09090B;border-radius:100px;padding:8px 16px;">
                      <div style="width:6px;height:6px;border-radius:50%;background-color:#FFF8F0;display:inline-block;"></div>
                      <span style="font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#FFF8F0;">Portfolio Contact</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color:#09090B;border-radius:24px;overflow:hidden;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Card Header -->
                <tr>
                  <td style="padding:40px 40px 0 40px;">
                    <h1 style="margin:0 0 8px 0;font-size:28px;font-weight:700;letter-spacing:-0.03em;color:#FAFAFA;line-height:1.1;">
                      New Message
                    </h1>
                    <p style="margin:0;font-size:13px;color:rgba(250,250,250,0.5);letter-spacing:0.05em;text-transform:uppercase;">
                      Someone reached out through your portfolio
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:24px 40px;">
                    <div style="height:1px;background-color:rgba(255,255,255,0.08);"></div>
                  </td>
                </tr>

                <!-- Sender Info -->
                <tr>
                  <td style="padding:0 40px 24px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="font-size:9px;font-weight:700;letter-spacing:0.35em;text-transform:uppercase;color:rgba(250,250,250,0.4);">From</span>
                          <div style="margin-top:6px;">
                            <span style="font-size:18px;font-weight:600;color:#FAFAFA;">${senderName}</span>
                          </div>
                          <div style="margin-top:4px;">
                            <a href="mailto:${senderEmail}" style="font-size:14px;color:rgba(250,250,250,0.6);text-decoration:none;">${senderEmail}</a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Body -->
                <tr>
                  <td style="padding:0 40px 40px 40px;">
                    <div style="background-color:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;">
                      <span style="font-size:9px;font-weight:700;letter-spacing:0.35em;text-transform:uppercase;color:rgba(250,250,250,0.4);display:block;margin-bottom:12px;">Message</span>
                      <p style="margin:0;font-size:15px;line-height:1.75;color:#FAFAFA;white-space:pre-wrap;">
                        ${escapedMessage}
                      </p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:24px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${senderEmail}?subject=Re: Your message via vinceestander.dev"
                       style="display:inline-block;background-color:#09090B;color:#FFF8F0;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;padding:14px 28px;border-radius:100px;border:1px solid rgba(9,9,11,0.15);">
                      Reply to ${senderName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:8px;border-top:1px solid rgba(9,9,11,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-top:24px;">
                    <p style="margin:0;font-size:11px;color:rgba(9,9,11,0.4);text-align:center;">
                      Received ${timestamp} (Philippine Time)
                    </p>
                    <p style="margin:8px 0 0;font-size:11px;color:rgba(9,9,11,0.35);text-align:center;">
                      Vince Gabriel · Portfolio Contact Form
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildEmailText({ senderName, senderEmail, message }: EmailTemplateProps): string {
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });

  return `New Portfolio Contact Message
=============================

From: ${senderName}
Email: ${senderEmail}

Message:
--------
${message}

Received: ${timestamp} (Philippine Time)
`;
}
