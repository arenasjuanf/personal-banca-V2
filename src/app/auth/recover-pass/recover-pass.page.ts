/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
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
  ingresarPin = false;

  constructor(
    private fb: RxFormBuilder,
    public forms: FormsService,
    private authService: AuthService,
    private loading: LoadingService,
    private toast: ToastService,
    private alertController: AlertController,
    private router: Router
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
          this.ingresarPin = true;
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

  confirmPin(pin: string | number){
    const {correo: email} = this.form.value;
    this.loading.show('Validando PIN...');
    this.authService.sendRecoverPin(email, pin).subscribe((result) => {
      this.loading.hide();
      const {success} = result;
      this.toast.show({
        message: success ? 'Pin correcto': 'Pin Incorrecto',
        icon: success ? 'checkmark' : 'close',
        position: 'bottom',
        duration: 1000
      });

      if(success){
        this.showAlertPassword();
      }
    });
  }


  async showAlertPassword(){
    const alert = await this.alertController.create({
      header: 'Ingresa la nueva contraseña',
      inputs: [
        {
          name: 'pass',
          type: 'password',
          placeholder: 'Nueva Clave'
        },
        {
          name: 'pass2',
          type: 'password',
          placeholder: 'Repite Nueva Clave'
        }
      ],
      buttons: [{
        text: 'Aceptar',
        handler: ({pass, pass2}) => {
          if(pass === pass2){
            this.loading.show('Asignando nueva contraseña');
            const {correo: email} = this.form.value;
            this.authService.setNewPassword(email, pass).subscribe((result) => {
              if(result.success){
                this.toast.show({
                  message: 'Nueva Contraseña asignada correctamente',
                  icon:'checkmark',
                  position: 'bottom',
                  duration: 1500
                });
                this.router.navigateByUrl('auth');
              }else{
                this.toast.show({
                  message: 'Error al asignar nueva contraseña',
                  icon:'close',
                  position: 'bottom',
                  duration: 1500
                });
              }
              this.loading.hide();
            });
          }else{
            this.showAlertPassword();
          }
        }
      },
      {
        role: 'cancel', text: 'Cancelar'
      }]
    });
    await alert.present();
  }

}
