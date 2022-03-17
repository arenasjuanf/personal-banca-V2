import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(
    private formBuilder: RxFormBuilder
  ) { }

  initForm(model: InstanceType<any>): RxFormGroup{
    return this.formBuilder.formGroup(model) as RxFormGroup;
  }

  resetForm(form: RxFormGroup): void{
    form.reset();
  }

  touchForm(form: RxFormGroup): void{
    form.markAllAsTouched();
  }

  getErrors(form: RxFormGroup, field: string): ValidationErrors{
    return form.get(field).touched ? form.get(field).errors : {};
  }

}
