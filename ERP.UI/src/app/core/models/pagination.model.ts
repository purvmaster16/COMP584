import { FilterBy } from "../enums/module.enums";

export class Pagination {
  pageNumber: number = 0;
  pageSize?: number = 10;
  filter?: FilterObject[] = null;
  sortBy?: string
  id?: number
}

export class FilterObject {
  fieldName: string;
  filterValue: any;
  filterType: FilterBy
}
