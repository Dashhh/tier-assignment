import { Feature, Point as GeoJSONPoint } from 'geojson';
import { ClusterProps } from './cluster-props.type';

export type Point = Feature<GeoJSONPoint, ClusterProps>;
