const mapping: Record<string, string> = {
  'customer-inquiries': 'customer_inquiry',
  organizations: 'organization',
  products: 'product',
  'sales-leads': 'sales_lead',
  'sales-pipelines': 'sales_pipeline',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
