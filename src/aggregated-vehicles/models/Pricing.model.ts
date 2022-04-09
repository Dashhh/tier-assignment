import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Pricing as TierPricing } from '../../tier/interfaces/pricing.interface';

@ObjectType()
export class Pricing implements TierPricing {
  @Field((type) => Int, { nullable: true })
  end?: number;
  @Field((type) => Int)
  interval: number;
  @Field((type) => Float)
  rate: number;
  @Field((type) => Int)
  start: number;
}
