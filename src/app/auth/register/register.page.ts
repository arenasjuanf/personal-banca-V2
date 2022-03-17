import { Component, OnInit } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { RegisterModel } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: RxFormGroup;

  constructor(
    private authService: AuthService,
    public forms: FormsService,

  ) {
    this.form = this.forms.initForm(new RegisterModel());
  }

  ngOnInit() {
  }
  register(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.authService.register(this.form.value).subscribe(console.log)
  }

}
