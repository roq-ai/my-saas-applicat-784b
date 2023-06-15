import { SalesPipelineInterface } from 'interfaces/sales-pipeline';
import { GetQueryInterface } from 'interfaces';

export interface SalesLeadInterface {
  id?: string;
  status: string;
  sales_pipeline_id: string;
  created_at?: any;
  updated_at?: any;

  sales_pipeline?: SalesPipelineInterface;
  _count?: {};
}

export interface SalesLeadGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  sales_pipeline_id?: string;
}
