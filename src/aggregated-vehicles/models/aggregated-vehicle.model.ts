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
  @Field((type) => Float)
  @Expose()
  get lat(): number {
    return this.geometry.coordinates[0];
  }

  @Field((type) => Float)
  @Expose()
  get lon(): number {
    return this.geometry.coordinates[1];
  }

  @Field((type) => Int)
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

  @Field((type) => PricingPlan, { nullable: true })
  pricingPlan?: PricingPlan;

  @Field((type) => PricingPlan)
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
