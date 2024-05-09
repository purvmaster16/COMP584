import { AnyFn } from '@ngrx/store/src/selector';
export class GridOption {
  constructor(paging?:boolean,add?:CustomAddButton)
  {
    this.disableExternalPaging =paging??true;
    this.AddRow = add;
  }
  disableExternalPaging:boolean;
  AddRow?:CustomAddButton;
}
export class CustomAddButton{
  constructor(text?:string,click?:AnyFn,disabled?:AnyFn,cssClass?:string){
    this.text=text??"Add";
    this.onClick=click;
    this.disabled = disabled??(():boolean=>{return false;});
    this.cssClass=cssClass??"btn btn-primary users-list-clear glow mb-0 ml-auto";
  }
  text?:string;
  onClick?:AnyFn = ()=> void{};
  cssClass?:string;
  disabled :AnyFn=():boolean=>{return false;};
}
