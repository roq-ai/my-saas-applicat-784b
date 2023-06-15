import axios from 'axios';
import queryString from 'query-string';
import { SalesLeadInterface, SalesLeadGetQueryInterface } from 'interfaces/sales-lead';
import { GetQueryInterface } from '../../interfaces';

export const getSalesLeads = async (query?: SalesLeadGetQueryInterface) => {
  const response = await axios.get(`/api/sales-leads${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSalesLead = async (salesLead: SalesLeadInterface) => {
  const response = await axios.post('/api/sales-leads', salesLead);
  return response.data;
};

export const updateSalesLeadById = async (id: string, salesLead: SalesLeadInterface) => {
  const response = await axios.put(`/api/sales-leads/${id}`, salesLead);
  return response.data;
};

export const getSalesLeadById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sales-leads/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSalesLeadById = async (id: string) => {
  const response = await axios.delete(`/api/sales-leads/${id}`);
  return response.data;
};
