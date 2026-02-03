import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX_MESSAGE_LENGTH = 5000;

const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
        switch (char) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#39;';
            default:
                return char;
        }
    });

const normalize = (value: unknown) =>
    typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : '';

const pickField = (data: Record<string, unknown>, keys: string[]) => {
    for (const key of keys) {
        const value = normalize(data[key]);
        if (value) return value;
    }
    return '';
};

const parseBody = async (req: Request): Promise<Record<string, unknown>> => {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const json = await req.json();
        if (json && typeof json === 'object') {
            return json as Record<string, unknown>;
        }
        return {};
    }

    const form = await req.formData();
    const data: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
        if (typeof value === 'string') {
            data[key] = value;
        }
    }
    return data;
};

export async function POST(req: Request) {
    let data: Record<string, unknown>;
    try {
        data = await parseBody(req);
    } catch (error) {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }

    // Honeypot check (spam protection)
    const honeypot = pickField(data, ['website']);
    if (honeypot) {
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Extract form fields
    const name = pickField(data, ['name', 'fullName', 'fullname']);
    const phone = pickField(data, ['phone', 'phoneNumber', 'phone_number', 'tel']);
    const email = pickField(data, ['email', 'emailAddress', 'email_address']);
    const address = pickField(data, ['address', 'serviceAddress', 'service_address', 'location']);
    const message = pickField(data, ['message', 'details', 'notes', 'description']);
    const service = pickField(data, ['service', 'serviceNeeded', 'service_needed', 'selectedService']);
    const page = pickField(data, ['page', 'pageUrl', 'page_url']);
    const site = pickField(data, ['site', 'siteUrl', 'site_url']);

    // Validation - require name and phone at minimum
    if (!name || !phone) {
        return NextResponse.json(
            { ok: false, error: 'Please provide your name and phone number.' },
            { status: 400 }
        );
    }

    if (message && message.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json(
            { ok: false, error: 'Message is too long. Please keep it under 5000 characters.' },
            { status: 400 }
        );
    }

    // Check environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;
    if (!resendApiKey || !toEmail) {
        return NextResponse.json(
            { ok: false, error: 'Server misconfigured. Missing RESEND_API_KEY or LEAD_TO_EMAIL.' },
            { status: 500 }
        );
    }

    // Format timestamp for Central Time
    const timestamp = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
    }).format(new Date());

    const safeName = name || 'Website Visitor';
    const safeService = service || 'General Inquiry';
    const subject = `🚨 New Lead 🚨 ${safeService} | ${safeName}`;

    // Handle dev URLs
    const pageUrlIsDev =
        !!page &&
        (/localhost/i.test(page) || /127\.0\.0\.1/.test(page) || /0\.0\.0\.0/.test(page));
    const pageUrlDisplay = page ? (pageUrlIsDev ? `${page} (dev link)` : page) : '';

    // Format phone link for tel: href
    const phoneLink = (() => {
        if (!phone) return '';
        if (phone.trim().startsWith('+')) {
            return phone.replace(/[^\d+]/g, '');
        }
        const digits = phone.replace(/\D/g, '');
        if (!digits) return '';
        if (digits.length === 10) return `+1${digits}`;
        if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
        return digits;
    })();

    // Plain text version
    const textLines = [
        `🚨 NEW LEAD - Made New Pressure Washing 🚨`,
        ``,
        `Timestamp: ${timestamp}`,
        name ? `Name: ${name}` : '',
        phone ? `Phone: ${phone}` : '',
        email ? `Email: ${email}` : '',
        service ? `Service: ${service}` : '',
        address ? `Service Address: ${address}` : '',
        pageUrlDisplay ? `Page: ${pageUrlDisplay}` : '',
        site ? `Site: ${site}` : '',
        ``,
        `Additional Notes:`,
        message || '(none provided)',
    ].filter(Boolean);

    const text = textLines.join('\n');
    const escapedAddress = address ? escapeHtml(address) : '';
    const escapedMessage = message ? escapeHtml(message).replace(/\n/g, '<br />') : '';

    // Made New Pressure Washing themed HTML email
    // Brand Colors: Navy #0e2a47, Red #e60000
    const html = `
  <div style="background-color:#f3f4f6;margin:0;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
      New estimate request from ${escapeHtml(safeName)} — tap to call now.
    </span>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 10px 25px rgba(14,42,71,0.12);overflow:hidden;">
      <!-- Header with Navy Background -->
      <tr>
        <td style="background:#0e2a47;color:#ffffff;padding:20px 24px;border-top:6px solid #e60000;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <div style="font-size:18px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">Made New Pressure Washing</div>
                <div style="font-size:11px;color:#94a3b8;margin-top:4px;letter-spacing:0.3px;">Professional Exterior Cleaning • Tomball, TX</div>
              </td>
              <td align="right">
                <span style="display:inline-block;background:#e60000;color:#ffffff;font-weight:800;font-size:11px;padding:8px 14px;border-radius:999px;letter-spacing:1.5px;text-transform:uppercase;">NEW LEAD</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lead Summary -->
      <tr>
        <td style="padding:28px 24px 20px;">
          <div style="font-size:28px;font-weight:800;margin:0 0 8px;color:#0e2a47;">${escapeHtml(safeName)}</div>
          <div style="font-size:16px;color:#e60000;font-weight:700;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(safeService)}</div>
          <div style="font-size:12px;color:#6b7280;">${escapeHtml(timestamp)}</div>
        </td>
      </tr>

      <!-- Action Buttons -->
      <tr>
        <td style="padding:0 24px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding:0 0 12px;">
                <a href="tel:${escapeHtml(phoneLink || phone)}" style="display:block;background:#e60000;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;text-align:center;padding:16px 20px;border-radius:8px;text-transform:uppercase;letter-spacing:1px;">
                  📞 Hold to Call Lead
                </a>
              </td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding:0 0 12px;">
                <a href="mailto:${escapeHtml(email)}" style="display:block;background:#0e2a47;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;text-align:center;padding:14px 20px;border-radius:8px;text-transform:uppercase;letter-spacing:0.5px;">✉️ Email Lead</a>
              </td>
            </tr>
            ` : ''}
            ${pageUrlDisplay ? `
            <tr>
              <td style="padding:0;">
                <a href="${page}" style="font-size:12px;color:#e60000;text-decoration:none;font-weight:600;">🔗 View Page They Came From</a>
              </td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>

      <!-- Lead Details Card -->
      <tr>
        <td style="padding:0 24px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0e2a47;padding:14px 18px;font-weight:700;color:#ffffff;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Lead Details</td>
            </tr>
            <tr>
              <td style="padding:0 18px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;">
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;width:110px;border-bottom:1px solid #f1f5f9;">Name</td>
                    <td style="padding:14px 0;color:#0e2a47;font-weight:700;border-bottom:1px solid #f1f5f9;">${escapeHtml(safeName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;border-bottom:1px solid #f1f5f9;">Phone</td>
                    <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                      <a href="tel:${escapeHtml(phoneLink || phone)}" style="color:#0e2a47;text-decoration:none;font-weight:700;">${escapeHtml(phone)}</a>
                    </td>
                  </tr>
                  ${email ? `
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;border-bottom:1px solid #f1f5f9;">Email</td>
                    <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#0e2a47;text-decoration:none;font-weight:700;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;border-bottom:1px solid #f1f5f9;">Service</td>
                    <td style="padding:14px 0;color:#e60000;font-weight:700;border-bottom:1px solid #f1f5f9;">${escapeHtml(safeService)}</td>
                  </tr>
                  ${pageUrlDisplay ? `
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;border-bottom:1px solid #f1f5f9;">Page URL</td>
                    <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                      <a href="${page}" style="color:#e60000;text-decoration:none;font-weight:600;font-size:12px;">${escapeHtml(pageUrlDisplay)}</a>
                    </td>
                  </tr>
                  ` : ''}
                  ${site ? `
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;border-bottom:1px solid #f1f5f9;">Site</td>
                    <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                      <a href="${escapeHtml(site)}" style="color:#e60000;text-decoration:none;font-weight:600;">${escapeHtml(site)}</a>
                    </td>
                  </tr>
                  ` : ''}
                  ${escapedAddress ? `
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;border-bottom:1px solid #f1f5f9;">Service Address</td>
                    <td style="padding:14px 0;color:#0e2a47;font-weight:600;border-bottom:1px solid #f1f5f9;">${escapedAddress}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding:14px 0;color:#6b7280;vertical-align:top;">Notes</td>
                    <td style="padding:14px 0;color:#0e2a47;">
                      ${escapedMessage ? `<div style="font-weight:500;line-height:1.6;">${escapedMessage}</div>` : `<div style="font-style:italic;color:#9ca3af;">No additional notes provided.</div>`}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer Note -->
      <tr>
        <td style="padding:0 24px 28px;">
          <div style="border-left:4px solid #e60000;padding:12px 16px;background:#fef2f2;border-radius:0 8px 8px 0;font-size:12px;color:#0e2a47;">
            <strong>💡 Quick Tip:</strong> Respond within 5 minutes to maximize your chance of booking this job!
            <span style="display:block;margin-top:6px;color:#9ca3af;font-size:10px;">This lead came from your Made New Pressure Washing website.</span>
          </div>
        </td>
      </tr>

      <!-- Branding Footer -->
      <tr>
        <td style="background:#0e2a47;padding:16px 24px;text-align:center;">
          <span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;">Powered by QuickLaunchWeb</span>
        </td>
      </tr>
    </table>
  </div>
  `;

    // Send email via Resend
    const resend = new Resend(resendApiKey);
    const bcc = process.env.LEADS_BCC_EMAIL
        ? process.env.LEADS_BCC_EMAIL.split(',').map((entry) => entry.trim()).filter(Boolean)
        : undefined;

    const { error } = await resend.emails.send({
        from: 'Made New Pressure Washing | New Lead <leads@quicklaunchweb.us>',
        to: [toEmail],
        bcc,
        replyTo: email || undefined,
        subject,
        text,
        html,
    });

    if (error) {
        console.error('Resend error:', error);
        return NextResponse.json({ ok: false, error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
}
