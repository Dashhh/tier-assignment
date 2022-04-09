import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Point } from '../../aggregation/types/point.type';
import { Cluster } from '../../aggregation/types/cluster.type';
import { BBox } from 'geojson';
import { Point as GeoJSONPoint } from 'geojson';
import { Expose } from 'class-transformer';
import { ClusterProps } from '../../aggregation/types/cluster-props.type';
import { PricingPlan } from './pricing-plan.model';

@ObjectType()
export class AggregatedVehicle implements Point, Cluster {
  @Field(() => Float)
  @Expose()
  get lat(): number {
    return this.geometry.coordinates[0];
  }

  @Field(() => Float)
  @Expose()
  get lon(): number {
    return this.geometry.coordinates[1];
  }

  @Field(() => Int)
  @Expose()
  get count(): number {
    return this.properties.point_count;
  }

  @Field({ nullable: true })
  @Expose()
  get vehicleId(): string | undefined {
    return this.properties.id;
  }

  @Field({ nullable: true })
  @Expose()
  get pricingPlanId(): string | undefined {
    return this.properties.pricingPlanId;
  }

  @Field(() => Int, { nullable: true })
  @Expose()
  get currentRangeMeters(): number | undefined {
    return this.properties.currentRangeMeters;
  }

  @Field(() => PricingPlan, { nullable: true })
  pricingPlan?: PricingPlan;

  @Field(() => PricingPlan)
  bbox: BBox | undefined;
  geometry: GeoJSONPoint;

  id: string | number | undefined;
  type: 'Feature';

  constructor(partial: Partial<AggregatedVehicle>) {
    Object.assign(this, partial);
  }

  properties: ClusterProps & {
    id?: string;
  };
}
