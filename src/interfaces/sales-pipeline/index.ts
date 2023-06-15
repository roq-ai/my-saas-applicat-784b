import { SalesLeadInterface } from 'interfaces/sales-lead';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SalesPipelineInterface {
  id?: string;
  name: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  sales_lead?: SalesLeadInterface[];
  organization?: OrganizationInterface;
  _count?: {
    sales_lead?: number;
  };
}

export interface SalesPipelineGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
