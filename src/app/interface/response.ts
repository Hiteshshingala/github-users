export interface IResponse<T> {
  incomplete_results: boolean;
  items: Array<T>;
  total_count: number;
}
