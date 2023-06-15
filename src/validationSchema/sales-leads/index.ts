import * as yup from 'yup';

export const salesLeadValidationSchema = yup.object().shape({
  status: yup.string().required(),
  sales_pipeline_id: yup.string().nullable().required(),
});
