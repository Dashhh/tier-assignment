import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Pricing as TierPricing } from '../../tier/interfaces/pricing.interface';

@ObjectType()
export class Pricing implements TierPricing {
  @Field(() => Int, { nullable: true })
  end?: number;
  @Field(() => Int)
  interval: number;
  @Field(() => Float)
  rate: number;
  @Field(() => Int)
  start: number;
}
