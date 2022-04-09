export interface PricingPlan {
  plan_id: string;
  url?: string;
  name: string;
  currency: string;
  price: number;
  is_taxable: boolean;
  description: string;
  per_km_pricing?: {
    start: number;
    rate: number;
    interval: number;
    end?: number;
  }[];
  per_min_pricing?: {
    start: number;
    rate: number;
    interval: number;
    end?: number;
  }[];
  surge_pricing?: boolean;
}
