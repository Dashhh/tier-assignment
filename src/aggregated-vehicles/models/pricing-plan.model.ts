import { Field, ObjectType } from '@nestjs/graphql';
import { PricingPlan as TierPricingPlan } from '../../tier/interfaces/pricing-plan.interface';

@ObjectType()
export class PricingPlan implements TierPricingPlan {
  @Field()
  currency: string;
  description: string;
  is_taxable: boolean;
  name: string;
  per_km_pricing: {
    start: number;
    rate: number;
    interval: number;
    end?: number;
  }[];
  per_min_pricing: {
    start: number;
    rate: number;
    interval: number;
    end?: number;
  }[];
  plan_id: string;
  price: number;
  surge_pricing: boolean;
  url: string;

  constructor(partial: Partial<PricingPlan>) {
    Object.assign(this, partial);
  }
}
