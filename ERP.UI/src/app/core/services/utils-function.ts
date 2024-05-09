import { value } from './../../shared/data/dropdowns';
import { FieldDetails } from './../models/datatable-source-header.model';
import { Injectable } from '@angular/core';
import { MessageConstants } from '../constants/message.constant';
import { Validation } from '../enums/module.enums';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Just do @Injectable() if you're not on Angular v6+
})

export class UtilityService {

  /**
   *
   */
  constructor(private ngbDateParserFormatter: NgbDateParserFormatter) { }

  FormatString(str: string, ...val: any[]) {
    for (let index = 0; index < val.length; index++) {
      //console.log(val[index]);
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }
  //#region Control Event Functions
  InputNumberOnly(event) {
    if (event) {
      //  console.log(event)
      // return (/^[0-9]\d*$/.test(event.target.value + event.key))
      const input = event.target;
      if (!/^[0-9]\d*$/.test(event.key)) {
        input.value = input.value.replace(/[^0-9]*/g, "")
        let length = input.value.toString().length
        input.type = 'text';
        input.setSelectionRange(length, length);
        input.type = 'number';
      }
      // const charCode = (event.which) ? event.which : event.keyCode;
      //  return ((charCode >= 48 && charCode <= 57) // Numbers keyx
      //   || (charCode >= 96 && charCode <= 105) //Numlock numbers
      //   || (charCode == 8 || charCode == 46) // Backspace & Delete
      //   || (charCode >= 37 && charCode <= 40) // Arrow Keys
      //   )

    }
    // return true;
  }
  //#endregion
  //#region Validation
  IsRequiredValid(validationCell, value, InvalidCellName) {
    value = value ? value.toString().trim() : value;
    if (!value || value === "") {
      validationCell["Required"] =
        this.FormatString(
          MessageConstants.ValidationMessage.RequiredField,
          InvalidCellName
        );
      return false;
    } else {
      validationCell["Required"] = "";
      return true;
    }
  }

  requiredValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value?.toString().trim();
      const isEmpty = value == null || value.length === 0;
      return isEmpty ? { 'required': { value: control.value } } : null;
    };
  }

  IsMaxLengthValid(validationCell, value, InvalidCellName, size: number) {
    if (value && value.length > size) {
      validationCell["MaxLength"] =
        this.FormatString(
          MessageConstants.ValidationMessage.MaxLength,
          InvalidCellName,
          size
        );
      return false;
    } else {
      validationCell["MaxLength"] = "";
      return true;
    }
  }

  IsValid(row: any, value: any, fieldDetail: FieldDetails) {
    var isValid = true;
    if (fieldDetail) {
      row["validate"] = row["validate"] ?? {};
      row["validate"][fieldDetail.displayFieldName] = row["validate"][fieldDetail.displayFieldName] ?? {};
      var validationCell = row["validate"][fieldDetail.displayFieldName];
      fieldDetail.validations.forEach((validate) => {
        if (isValid) {
          if (validate == Validation.Required) {
            isValid = this.IsRequiredValid(validationCell, value, fieldDetail.displayFieldName)
          }
          else if (validate == Validation.MaxLength) {
            isValid = this.IsMaxLengthValid(validationCell, value, fieldDetail.displayFieldName, fieldDetail.maxLength)
          }
        }
      });
      validationCell["IsValid"] = isValid;
    }
    return isValid;
  }

  IsInvalid(row: any, fieldDetail: FieldDetails) {
    if (fieldDetail) {
      if (row.validate && row.validate[fieldDetail.displayFieldName] && (!row.validate[fieldDetail.displayFieldName]["IsValid"])) return true;
      else return false;
    }
    else return false;
  }

  GetInvalidMessage(row: any, fieldDetail: FieldDetails) {
    if (this.IsInvalid(row, fieldDetail)) {
      var cell = row["validate"][fieldDetail.displayFieldName];
      if (cell.Required) {
        return cell.Required
      }
      else if (cell.MaxLength) {
        return cell.MaxLength
      }
      else return "";
    }
    else return "";
  }
  //#endregion

  GetPageWiseRights(routeName: string) {
    if (routeName) {
      routeName = this.GetRouteFromUrl(routeName);
      let usersData = this.GetDataFromLocalStorage("LoginUserDetail");
      if (usersData) {
        let routesWiseData = usersData.userWiseMenuRights.find(x => x.path && x.path.includes(routeName)) || null
        if (!routesWiseData)
          routesWiseData = usersData.userWiseMenuRights.find(x => x.managePath && x.managePath.includes(routeName)) || null
        return routesWiseData;
      }
    }
  }

  GetDataFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || null);
  }

  GetRouteFromUrl(url: string) {
    if (url) {
      url = url.split('?')[0]
      let urlRoute = url.split('/').filter(segment => segment !== '');
      if (urlRoute.length > 2) {
        urlRoute.pop();
      }
      url = `/${urlRoute.join("/")}`
    }
    return url || null;
  }

  checkInvalidInputs(inputs: any[]) {
    let isError = false;
    inputs.forEach(input => {
      const control = input.control;
      if (control && control.invalid) {
        control.markAsTouched();
        isError = true;
      }
    });
    return isError;
  }

  maxDateValidator(maxDate: NgbDateStruct): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate: NgbDateStruct = control.value;
      if (selectedDate) {
        const dateToCompare = this.ngbDateParserFormatter.parse(this.ngbDateParserFormatter.format(selectedDate));
        if (dateToCompare > maxDate) {
          return { 'maxRequiredDate': { value: control.value } };
        }
      };
      return null;
    }
  }

  updatePageDetail(rows, paginationDet) {
    let isChanges: boolean = false;
    if (rows.length === 1 && paginationDet.pageNumber > 0) {
      paginationDet.pageNumber--;
      isChanges = true;
    }
    return isChanges;
  }

}
