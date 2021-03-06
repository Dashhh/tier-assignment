import { ClusterProperties } from 'supercluster';

export type ClusterProps = {
  id: string;
  pricingPlanId: string;
  currentRangeMeters: number;
} & ClusterProperties;
