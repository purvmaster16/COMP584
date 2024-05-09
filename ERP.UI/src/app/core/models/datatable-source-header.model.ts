import { Validation } from "../enums/module.enums";

export class DataTableSoruceHeader {
  name: string;
  prop: string;
  width: number;
  minWidth?: number;
  maxWidth?: number;
  cellTemplate?: any = null;
  editTemplate?: any = null;
  enableFilter: boolean;
  enableSorting: boolean;
  visibleIndex?: number;
  cellClass?: any = null;
  filter?: FilterObject;
  filterOptions?: Options[];
  fieldDetail?: FieldDetails;
  frozenLeft?: boolean;
  frozenRight?: boolean;
  headerClass?: any = null;
  isVisible ?: boolean;
}
export class FieldDetails {
  pattern?: string;
  maxLength?: number;
  displayFieldName: string;
  prop: string;
  validations?: Validation[];
}
export class FilterObject {
  type: string;
  value: any = null;
}
export class Options {
  Text: string;
  Value?: any = null;
}
