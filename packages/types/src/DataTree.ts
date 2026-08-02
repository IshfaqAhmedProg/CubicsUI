export interface DataTree<T extends DataTree<T> = DataTree<any>> {
  $id?: string;
  nodes?: T[];
}
