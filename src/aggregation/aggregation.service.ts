import { Injectable } from '@nestjs/common';
import Supercluster from 'supercluster';
import { ClusterProps } from './types/cluster-props.type';
import { BoundingBox } from './types/bounding-box.type';
import { DocklessVehicle } from '../tier/interfaces/dockless-vehicle.interface';
import { Point } from './types/point.type';

@Injectable()
export class AggregationService {
  aggregate(points: Point[], zoom: number, boundingBox: BoundingBox) {
    const supercluster = new Supercluster<ClusterProps, ClusterProps>({
      maxZoom: 16,
    });

    supercluster.load(points);

    return supercluster.getClusters(boundingBox, zoom);
  }

  aggregateDocklessVehicles(
    vehicles: DocklessVehicle[],
    zoom: number,
    boundingBox: BoundingBox,
  ) {
    const points: Point[] = vehicles.map((vehicle) => ({
      type: 'Feature',
      properties: {
        id: vehicle.bike_id,
        cluster: undefined,
        cluster_id: -1,
        point_count: 1,
        point_count_abbreviated: 1,
      },
      geometry: {
        coordinates: [vehicle.lat, vehicle.lon],
        type: 'Point',
      },
    }));

    return this.aggregate(points, zoom, boundingBox);
  }
}
