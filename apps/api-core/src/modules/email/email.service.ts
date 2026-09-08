import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

export interface SendEmailDto {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;
  private defaultFrom: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY || '';
    this.defaultFrom = process.env.RESEND_FROM || 'StaySphere <StaySphere@cybelinx.com>';
    this.resend = new Resend(apiKey);
    this.logger.log(`EmailService initialized with Resend sender: ${this.defaultFrom}`);
  }

  async sendEmail(params: SendEmailDto) {
    try {
      const from = params.from || this.defaultFrom;
      const to = Array.isArray(params.to) ? params.to : [params.to];

      this.logger.log(`Dispatching Resend email to ${to.join(', ')} | Subject: "${params.subject}"`);

      const { data, error } = await this.resend.emails.send({
        from,
        to,
        subject: params.subject,
        html: params.html,
        text: params.text,
        replyTo: params.replyTo,
      });

      if (error) {
        this.logger.error(`Resend API Dispatch Error: ${error.message}`);
        return {
          success: false,
          error: error.message,
        };
      }

      this.logger.log(`Email successfully delivered via Resend. ID: ${data?.id}`);
      return {
        success: true,
        messageId: data?.id,
        to,
        from,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      this.logger.error(`Resend unexpected dispatch error: ${err.message}`, err.stack);
      return {
        success: false,
        error: err.message || 'Unknown Resend error',
      };
    }
  }

  async getHealth() {
    try {
      const domains = await this.resend.domains.list();
      return {
        status: 'CONNECTED',
        provider: 'Resend',
        sender: this.defaultFrom,
        verifiedDomains: domains.data?.data?.map((d) => ({
          name: d.name,
          status: d.status,
          region: d.region,
        })) || [],
      };
    } catch (err: any) {
      return {
        status: 'DEGRADED',
        error: err.message,
      };
    }
  }

  // Pre-configured HTML template builders
  buildLuxuryEmailHtml(params: {
    heading: string;
    subheading?: string;
    badgeText?: string;
    paragraphs: string[];
    callToActionText?: string;
    callToActionUrl?: string;
  }): string {
    const paragraphsHtml = params.paragraphs
      .map(
        (p) =>
          `<p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.6; color: #CBD5E1;">${p}</p>`
      )
      .join('');

    const ctaHtml =
      params.callToActionText && params.callToActionUrl
        ? `<div style="margin: 24px 0 10px 0;">
            <a href="${params.callToActionUrl}" style="background: linear-gradient(135deg, #00A9A5 0%, #3CCF91 100%); color: #001428; padding: 12px 28px; border-radius: 12px; font-weight: 800; font-size: 13px; text-decoration: none; display: inline-block; letter-spacing: 0.5px;">${params.callToActionText}</a>
          </div>`
        : '';

    const badgeHtml = params.badgeText
      ? `<span style="background: rgba(0, 169, 165, 0.15); border: 1px solid rgba(0, 169, 165, 0.4); color: #00D2C4; padding: 4px 12px; border-radius: 9999px; font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">${params.badgeText}</span>`
      : '';

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${params.heading}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000B17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8FAFC;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000B17; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #001E36; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          <!-- Header -->
          <tr>
            <td style="padding: 24px 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background-color: #001428;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-family: Georgia, serif; font-size: 18px; font-weight: 800; letter-spacing: 3px; color: #FFFFFF;">STAYSPHERE</span>
                    <span style="font-size: 10px; color: #FFC857; margin-left: 6px; font-weight: 700; letter-spacing: 1px;">SOVEREIGN TRAVEL</span>
                  </td>
                  <td align="right">
                    ${badgeHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 30px;">
              <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">${params.heading}</h1>
              ${
                params.subheading
                  ? `<p style="margin: 0 0 24px 0; font-size: 13px; font-weight: 600; color: #3CCF91;">${params.subheading}</p>`
                  : '<div style="margin-bottom: 20px;"></div>'
              }
              <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 20px;">
                ${paragraphsHtml}
              </div>
              ${ctaHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #001020; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748B;">StaySphere Luxury Hospitality & Sovereign Mobility Network • 24/7 Concierge</p>
              <p style="margin: 0; font-size: 10px; color: #475569;">100% Escrow Protected Booking • Payout Guaranteed Post Check-In</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}
