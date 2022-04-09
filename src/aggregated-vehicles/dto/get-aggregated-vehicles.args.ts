import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import { ArrayMaxSize, ArrayMinSize, IsInt } from 'class-validator';
import { BoundingBox } from '../../aggregation/types/bounding-box.type';

@ArgsType()
export class GetAggregatedVehiclesArgs {
  @Field(() => Int)
  @IsInt()
  zoom: number;

  @Field(() => [Float])
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  boundingBox: BoundingBox;

  @Field(() => [Int], { nullable: true })
  @IsInt()
  minRange?: number;
}
