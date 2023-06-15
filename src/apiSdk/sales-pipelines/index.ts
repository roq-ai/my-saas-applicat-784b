import axios from 'axios';
import queryString from 'query-string';
import { SalesPipelineInterface, SalesPipelineGetQueryInterface } from 'interfaces/sales-pipeline';
import { GetQueryInterface } from '../../interfaces';

export const getSalesPipelines = async (query?: SalesPipelineGetQueryInterface) => {
  const response = await axios.get(`/api/sales-pipelines${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSalesPipeline = async (salesPipeline: SalesPipelineInterface) => {
  const response = await axios.post('/api/sales-pipelines', salesPipeline);
  return response.data;
};

export const updateSalesPipelineById = async (id: string, salesPipeline: SalesPipelineInterface) => {
  const response = await axios.put(`/api/sales-pipelines/${id}`, salesPipeline);
  return response.data;
};

export const getSalesPipelineById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sales-pipelines/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSalesPipelineById = async (id: string) => {
  const response = await axios.delete(`/api/sales-pipelines/${id}`);
  return response.data;
};
