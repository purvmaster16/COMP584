import { FilterBy } from './../../../core/enums/module.enums';
import { CoreConstants } from "../../constants/core.constants";
import {
  Input,
  Component,
  ViewChild,
  Output,
  EventEmitter,
  QueryList,
  ElementRef,
  ViewChildren,
  SimpleChanges
} from "@angular/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { Pagination } from "app/core/models/pagination.model";
import { DataTableSoruceHeader } from "app/core/models/datatable-source-header.model";
import { GridOption } from 'app/core/models/grid-option.model';
import { UtilityService } from '../../services/utils-function';

@Component({
  selector: "custom-datatable",
  templateUrl: "./custom-datatable.html",
})
export class CustomDatatable {
  @ViewChildren('filter') filters: QueryList<ElementRef>;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output() onFilterChange = new EventEmitter<any>();
  @Input() gridOptions: GridOption = new GridOption();
  @Input() paginationObj: Pagination;
  @Input() totalCount: number;
  @Input() sourceData = [];
  @Input() sourceHeader: DataTableSoruceHeader[] = [];
  @Input() showRecordLimitSelector:boolean = true;
  pageSizeList: number[];
  rows = [];
  oldRow = [];
  FilterType = CoreConstants.FilterType;
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  shortProp: string;
  shortDir: string;

  constructor(private utilityService: UtilityService,) {
    this.pageSizeList = CoreConstants?.PageSizeList;
  }

  /**
   * Listner for Page Number Change
   * @param event Even on Change Page
   */
  pageChange(event) {
    this.paginationObj.pageNumber = event?.offset;
    this.paginationObj.pageSize = event?.pageSize;
    this.onFilterChange.emit(this.paginationObj);
  }

  /**
   * Listner for Sorting on Column Click
   * @param event
   */
  onSort(event) {
    if (Array.isArray(event.sorts) && event.sorts.length > 0) {
      this.paginationObj.sortBy =
        event.sorts[0].prop + " " + event.sorts[0].dir;
    }
    this.onFilterChange.emit(this.paginationObj);
  }

  /**
   * Change Page Limit
   * @param limit
   */
  updateLimit(limit) {
    this.paginationObj.pageNumber = 0;
    this.paginationObj.pageSize = limit?.target?.value;
    this.onFilterChange.emit(this.paginationObj);
  }
  // ngAfterView
  ngOnInit(): void {
    let lastIndex = this.sourceHeader.length;
    this.sourceHeader = this.sourceHeader.sort((n1, n2) => (n1.visibleIndex ?? lastIndex) - (n2.visibleIndex ?? lastIndex));
    // Configure Filter Object for Enable Filter and set Default Text filter
    this.sourceHeader.forEach(a => {
      if (a.enableFilter && !a.filter) {
        a.filter = { type: CoreConstants.FilterType.Text, value: '' };
      }
    });
    this.paginationObj.pageSize = this.pageSizeList?.[0];
    if (this.paginationObj.sortBy) {
      let shortByArray = this.paginationObj.sortBy?.split(' ');
      this.shortProp = shortByArray[0];
      this.shortDir = shortByArray[1];
    }
    this.onFilterChange.emit(this.paginationObj);
  }

  onFilter() {
    this.paginationObj.filter = this.sourceHeader.filter(a => a.enableFilter && a.filter?.value).map(a => {
      return {
        fieldName: a.prop,
        filterValue: a.filter.value,
        filterType: a.filter.type === this.FilterType.Text ? FilterBy.Contain : FilterBy.Equal,
      }
    });
    this.onFilterChange.emit(this.paginationObj);
  }

  onActivate(event, rows, sourceHeader) {
    if (event.type === 'dblclick') {
      event.row.isEditable = true;
      let index = rows.indexOf(event.row);
      this.oldRow[index] = Object.assign({}, event.row);
    }
    else if (event.type === 'click') {
      rows.filter(x => x.isEditable).forEach((row) => {
        if (row != event.row) {
          let isValid = true;
          sourceHeader.forEach(a => {
            if (a.fieldDetail) {
              const fieldValid = this.utilityService.IsValid(row, row[a.fieldDetail.prop], a.fieldDetail);
              if (!fieldValid && isValid) {
                isValid = fieldValid;
              }
            }
          });
          if (isValid)
            row.isEditable = false;
          else {
            let index = rows.indexOf(row);
            row = Object.assign(row, this.oldRow[index]);
            row.isEditable = false;
          }
        }
      });
    }
  }
}

//   ngOnChanges(changes: SimpleChanges) {
//     console.log(changes,"changes")
//   }
// }
