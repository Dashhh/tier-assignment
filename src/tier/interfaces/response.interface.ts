export interface Response<U extends string, T> {
  last_updated: number;
  ttl: number;
  version: string;
  data: {
    [key in U]: T;
  };
}
