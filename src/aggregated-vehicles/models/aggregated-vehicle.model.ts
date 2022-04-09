import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Point } from '../../aggregation/types/point.type';
import { Cluster } from '../../aggregation/types/cluster.type';
import { PointProps } from '../../aggregation/types/point-props.type';
import { BBox } from 'geojson';
import { Point as GeoJSONPoint } from 'geojson';
import { Expose } from 'class-transformer';

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

  bbox: BBox | undefined;
  geometry: GeoJSONPoint;
  id: string | number | undefined;
  properties: PointProps;
  type: 'Feature';

  constructor(partial: Partial<AggregatedVehicle>) {
    Object.assign(this, partial);
  }
}
