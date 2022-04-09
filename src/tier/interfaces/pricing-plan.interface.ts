import { Pricing } from './pricing.interface';

export interface PricingPlan {
  plan_id: string;
  url?: string;
  name: string;
  currency: string;
  price: number;
  is_taxable: boolean;
  description: string;
  per_km_pricing?: Pricing[];
  per_min_pricing?: Pricing[];
  surge_pricing?: boolean;
}
