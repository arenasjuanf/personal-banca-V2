/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { RxFormBuilder, RxFormGroup, RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.page.html',
  styleUrls: ['./recover-pass.page.scss'],
})
export class RecoverPassPage implements OnInit {

  form: RxFormGroup;

  constructor(
    private fb: RxFormBuilder,
    public forms: FormsService,
    private authService: AuthService,
    private loading: LoadingService,
    private toast: ToastService
  ) {
    this.initForm();
  }

  ngOnInit() {
  }


  initForm(): void{
    this.form = <RxFormGroup>this.fb.group({
      correo: ['', [RxwebValidators.email({message: 'Debe ser un correo electrónico válido'}), RxwebValidators.required({message: 'Campo requerido'})]]
    });
  }

  sendRecoverMail(): void{
    if(this.form.valid){
      const {correo} = this.form.value;
      this.loading.show('Enviando mail...');
      this.authService.sendRecoverMail(correo).subscribe((result) => {
        const {success,msj} = result;
        this.loading.hide();
        if(success){
          this.toast.show({
            message: msj,
            icon: 'checkmark',
            position: 'bottom',
            duration: 1500
          });
        }else{
          this.toast.show({
            message: 'Correo Electrónico no encontrado',
            icon: 'close',
            position: 'bottom',
            duration: 1500
          });
        }
      }, () => {
        this.loading.hide();

        this.toast.show({
          message: 'Correo Electrónico no encontrado',
          icon: 'close',
          position: 'bottom',
          duration: 1500
        });
      });
    }
  }
}
