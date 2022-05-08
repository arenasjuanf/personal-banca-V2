import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { RegisterModel } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private toast: ToastService,
    private router: Router,
    private loading: LoadingService,
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
    this.loading.show('Registrando usuario');
    this.authService.register(this.form.value).subscribe(({success, msj}) => {

      this.toast.show({
        message: success ? 'Registro Exitoso' : msj,
        icon: success ? 'checkmark' : 'close',
        position: 'bottom',
        duration: 1500
      });
      this.loading.hide();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      success && this.router.navigateByUrl('pages/auth');

    });
  }
}
