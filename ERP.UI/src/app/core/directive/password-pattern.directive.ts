import { Directive, Input, forwardRef } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl,
} from "@angular/forms";
import { CustomevalidationService } from "../services/customevalidation.service";

@Directive({
  selector: '[appPasswordPattern]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordPatternDirective,
      multi: true,
    },
  ],
})
export class PasswordPatternDirective implements Validator{
  constructor(private readonly customValidator: CustomevalidationService) 
  {
    console.log("directive call")
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.patternValidator()(control);
  }

}
