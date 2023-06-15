import * as yup from 'yup';
import { salesLeadValidationSchema } from 'validationSchema/sales-leads';

export const salesPipelineValidationSchema = yup.object().shape({
  name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  sales_lead: yup.array().of(salesLeadValidationSchema),
});
