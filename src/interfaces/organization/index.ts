import { CustomerInquiryInterface } from 'interfaces/customer-inquiry';
import { ProductInterface } from 'interfaces/product';
import { SalesPipelineInterface } from 'interfaces/sales-pipeline';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  customer_inquiry?: CustomerInquiryInterface[];
  product?: ProductInterface[];
  sales_pipeline?: SalesPipelineInterface[];
  user?: UserInterface;
  _count?: {
    customer_inquiry?: number;
    product?: number;
    sales_pipeline?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
