import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInquiryInterface {
  id?: string;
  status: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface CustomerInquiryGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  organization_id?: string;
}
