export interface IItem {
  readonly id: number;
  readonly title: string;
  readonly parent_id: number | null;
  children?: IItem[];
}
