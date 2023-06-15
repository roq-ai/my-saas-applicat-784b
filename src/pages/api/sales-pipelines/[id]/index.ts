import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { salesPipelineValidationSchema } from 'validationSchema/sales-pipelines';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sales_pipeline
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSalesPipelineById();
    case 'PUT':
      return updateSalesPipelineById();
    case 'DELETE':
      return deleteSalesPipelineById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSalesPipelineById() {
    const data = await prisma.sales_pipeline.findFirst(convertQueryToPrismaUtil(req.query, 'sales_pipeline'));
    return res.status(200).json(data);
  }

  async function updateSalesPipelineById() {
    await salesPipelineValidationSchema.validate(req.body);
    const data = await prisma.sales_pipeline.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSalesPipelineById() {
    const data = await prisma.sales_pipeline.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
