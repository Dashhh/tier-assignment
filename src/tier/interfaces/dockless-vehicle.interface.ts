export interface DocklessVehicle {
  bike_id: string;
  lat: string;
  lon: string;
  is_reserved: boolean;
  is_disabled: boolean;
  vehicle_type_id: string;
  last_reported: number;
  current_range_meters: number;
  pricing_plan_id?: string;
}
