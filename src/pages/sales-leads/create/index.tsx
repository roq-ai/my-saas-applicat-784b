import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSalesLead } from 'apiSdk/sales-leads';
import { Error } from 'components/error';
import { salesLeadValidationSchema } from 'validationSchema/sales-leads';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SalesPipelineInterface } from 'interfaces/sales-pipeline';
import { getSalesPipelines } from 'apiSdk/sales-pipelines';
import { SalesLeadInterface } from 'interfaces/sales-lead';

function SalesLeadCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SalesLeadInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSalesLead(values);
      resetForm();
      router.push('/sales-leads');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SalesLeadInterface>({
    initialValues: {
      status: '',
      sales_pipeline_id: (router.query.sales_pipeline_id as string) ?? null,
    },
    validationSchema: salesLeadValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Sales Lead
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<SalesPipelineInterface>
            formik={formik}
            name={'sales_pipeline_id'}
            label={'Select Sales Pipeline'}
            placeholder={'Select Sales Pipeline'}
            fetcher={getSalesPipelines}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'sales_lead',
  operation: AccessOperationEnum.CREATE,
})(SalesLeadCreatePage);
