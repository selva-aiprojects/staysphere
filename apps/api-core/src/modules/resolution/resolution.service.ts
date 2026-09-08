import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@staysphere/database';
import { CreateTicketInput, UpdateTicketStatusInput } from '@staysphere/validation-schemas';

@Injectable()
export class ResolutionService {
  async getTickets(query?: { status?: string; priority?: string; limit?: number }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.priority) where.priority = query.priority;

    return prisma.ticket.findMany({
      where,
      include: {
        creator: {
          select: { id: true, fullName: true, email: true, role: true },
        },
        assignedAgent: {
          select: { id: true, fullName: true, email: true },
        },
        evidence: true,
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
      take: query?.limit || 50,
    });
  }

  async createTicket(creatorUserId: string, input: CreateTicketInput) {
    const ticketCount = await prisma.ticket.count();
    const ticketNumber = `TICK-${(ticketCount + 1001).toString()}`;

    // SLA Config Matrix
    let initialResponseSlaMinutes = 60;
    let resolutionTargetMinutes = 240;

    if (input.priority === 'P0_CRITICAL') {
      initialResponseSlaMinutes = 10;
      resolutionTargetMinutes = 45;
    } else if (input.priority === 'P1_HIGH') {
      initialResponseSlaMinutes = 20;
      resolutionTargetMinutes = 90;
    }

    const slaBreachDeadline = new Date(Date.now() + initialResponseSlaMinutes * 60 * 1000);

    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber,
        category: input.category,
        priority: input.priority,
        status: 'OPEN',
        subject: input.subject,
        description: input.description,
        creatorUserId,
        relatedStayBookingId: input.relatedStayBookingId,
        relatedTransitBookingId: input.relatedTransitBookingId,
        initialResponseSlaMinutes,
        resolutionTargetMinutes,
        slaBreachDeadline,
      },
    });

    return ticket;
  }

  async updateTicket(ticketId: string, input: UpdateTicketStatusInput) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const data: any = {
      status: input.status,
    };

    if (input.assignedAgentId) data.assignedAgentId = input.assignedAgentId;
    if (input.proposedResolution) data.proposedResolution = input.proposedResolution;
    if (input.serviceRecoveryType) data.serviceRecoveryType = input.serviceRecoveryType;
    if (input.serviceRecoveryAmount !== undefined)
      data.serviceRecoveryAmount = input.serviceRecoveryAmount;

    return prisma.ticket.update({
      where: { id: ticketId },
      data,
    });
  }
}
