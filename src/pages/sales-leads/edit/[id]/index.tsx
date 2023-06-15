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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getSalesLeadById, updateSalesLeadById } from 'apiSdk/sales-leads';
import { Error } from 'components/error';
import { salesLeadValidationSchema } from 'validationSchema/sales-leads';
import { SalesLeadInterface } from 'interfaces/sales-lead';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SalesPipelineInterface } from 'interfaces/sales-pipeline';
import { getSalesPipelines } from 'apiSdk/sales-pipelines';

function SalesLeadEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SalesLeadInterface>(
    () => (id ? `/sales-leads/${id}` : null),
    () => getSalesLeadById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SalesLeadInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSalesLeadById(id, values);
      mutate(updated);
      resetForm();
      router.push('/sales-leads');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SalesLeadInterface>({
    initialValues: data,
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
            Edit Sales Lead
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'sales_lead',
  operation: AccessOperationEnum.UPDATE,
})(SalesLeadEditPage);
