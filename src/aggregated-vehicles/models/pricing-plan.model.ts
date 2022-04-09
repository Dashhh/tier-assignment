import { Field, ObjectType } from '@nestjs/graphql';
import { PricingPlan as TierPricingPlan } from '../../tier/interfaces/pricing-plan.interface';
import { Pricing } from './Pricing.model';

@ObjectType()
export class PricingPlan implements TierPricingPlan {
  @Field()
  currency: string;
  @Field()
  description: string;
  @Field()
  name: string;
  @Field((type) => [Pricing], { nullable: true })
  per_min_pricing?: Pricing[];
  is_taxable: boolean;
  per_km_pricing?: Pricing[];
  plan_id: string;
  price: number;
  surge_pricing: boolean;
  url: string;

  constructor(partial: Partial<PricingPlan>) {
    Object.assign(this, partial);
  }
}
