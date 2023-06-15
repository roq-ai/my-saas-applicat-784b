import * as yup from 'yup';
import { customerInquiryValidationSchema } from 'validationSchema/customer-inquiries';
import { productValidationSchema } from 'validationSchema/products';
import { salesPipelineValidationSchema } from 'validationSchema/sales-pipelines';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  customer_inquiry: yup.array().of(customerInquiryValidationSchema),
  product: yup.array().of(productValidationSchema),
  sales_pipeline: yup.array().of(salesPipelineValidationSchema),
});
