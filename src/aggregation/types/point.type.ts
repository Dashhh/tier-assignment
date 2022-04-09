import { Feature, Point as GeoJSONPoint } from 'geojson';
import { PointProps } from './point-props.type';

export type Point = Feature<GeoJSONPoint, PointProps>;
