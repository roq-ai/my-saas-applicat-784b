import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { salesLeadValidationSchema } from 'validationSchema/sales-leads';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sales_lead
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSalesLeadById();
    case 'PUT':
      return updateSalesLeadById();
    case 'DELETE':
      return deleteSalesLeadById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSalesLeadById() {
    const data = await prisma.sales_lead.findFirst(convertQueryToPrismaUtil(req.query, 'sales_lead'));
    return res.status(200).json(data);
  }

  async function updateSalesLeadById() {
    await salesLeadValidationSchema.validate(req.body);
    const data = await prisma.sales_lead.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSalesLeadById() {
    const data = await prisma.sales_lead.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
