import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { FormsService } from '../services/forms.service';
import { LoadingService } from '../services/loading.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form: RxFormGroup;

  constructor(
    private router: Router,
    public forms: FormsService,
    private authService: AuthService,
    private storage: StorageService,
    private loading: LoadingService,
    private toast: ToastService
  ) {
    this.form = this.forms.initForm(new LoginModel());
  }

  ngOnInit() {
  }

  goTo(path: string): void{
    this.router.navigateByUrl(path);
  }

  login(): void{
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    const {email, password } = this.form.value;
    this.loading.show('Iniciando sesión ...');
    this.authService.login(email, password).subscribe(async ({success, msj}) => {
      const {pass, pin, ...userData}  = msj;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if(success){
        await this.storage.set('user', userData);
        this.router.navigateByUrl('pages/home');
      }else{
        this.toast.show({
          message: msj,
          icon: 'close',
          position: 'bottom',
          duration: 1500
        });
      }
      this.loading.hide();
    });
  }
}
