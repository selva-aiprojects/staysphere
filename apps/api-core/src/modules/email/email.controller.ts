import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

export class SendEmailPayload {
  to!: string | string[];
  subject!: string;
  html?: string;
  templateId?: string;
  customHeading?: string;
  customSubheading?: string;
  badgeText?: string;
  paragraphs?: string[];
  callToActionText?: string;
  callToActionUrl?: string;
  from?: string;
}

@ApiTags('Email Communications (Resend)')
@Controller('api/v1/emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('health')
  @ApiOperation({ summary: 'Check Resend email provider status and verified domains' })
  async checkHealth() {
    return this.emailService.getHealth();
  }

  @Post('send')
  @ApiOperation({ summary: 'Dispatch transactional or marketing email via Resend' })
  async sendEmail(@Body() body: SendEmailPayload) {
    let finalHtml = body.html;

    if (!finalHtml && body.paragraphs && body.paragraphs.length > 0) {
      finalHtml = this.emailService.buildLuxuryEmailHtml({
        heading: body.customHeading || body.subject,
        subheading: body.customSubheading,
        badgeText: body.badgeText,
        paragraphs: body.paragraphs,
        callToActionText: body.callToActionText,
        callToActionUrl: body.callToActionUrl,
      });
    }

    if (!finalHtml) {
      finalHtml = `<p>${body.subject}</p>`;
    }

    return this.emailService.sendEmail({
      to: body.to,
      subject: body.subject,
      html: finalHtml,
      from: body.from,
    });
  }

  @Post('test')
  @ApiOperation({ summary: 'Send a quick test email to verify Resend delivery' })
  async sendTestEmail(@Body() body: { to: string }) {
    const html = this.emailService.buildLuxuryEmailHtml({
      heading: 'StaySphere Resend Dispatch Verification',
      subheading: 'Live SMTP Gateway Connected',
      badgeText: 'RESEND VERIFIED DOMAIN: cybelinx.com',
      paragraphs: [
        'Greetings from the StaySphere Operations Control Tower.',
        'This test email confirms that your Resend API integration (cybelinx.com) is operational and ready to transmit high-deliverability guest confirmations, partner remittances, chauffeur dispatches, and SLA escalation alerts.',
        'All communications sent through this pipeline are digitally signed with DKIM/SPF standards for maximum inbox placement.',
      ],
      callToActionText: 'Open StaySphere Control Tower →',
      callToActionUrl: 'http://localhost:3002',
    });

    return this.emailService.sendEmail({
      to: body.to || 'selva@cybelinx.com',
      subject: 'StaySphere Live Test Email — Resend Gateway Active',
      html,
    });
  }
}
