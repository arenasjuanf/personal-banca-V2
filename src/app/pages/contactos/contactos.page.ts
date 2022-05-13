import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegisterModel } from 'src/app/models/register.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

export interface contacto {email: string; idContacto: number, idUser: number; nombre: string}
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {


  public headerOptions: { endIcon: string; endFunction: () => void};
  listaContactos: contacto[];


  constructor(
    private contactosSVc: ContactsService,
    private storage: StorageService,
    private alertController: AlertController,
    private loading: LoadingService,
    private toast: ToastService
  ) { 
    this.initHeaderOptions();
    this.traerContactos();
  }

  ngOnInit() {
  }

  async traerContactos(){
    const { id: userId } = await this.storage.get('user');
    this.contactosSVc.getContacts(userId).subscribe((contactos: contacto[]) => {
      this.listaContactos = contactos;
    });
  }

  initHeaderOptions(){
    this.headerOptions = {
      endIcon: 'add',
      endFunction : () => this.searchContact()
    };
  }

  async searchContact(){
    const alert = await this.alertController.create({
      header: 'Agregar Contacto',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo de contacto'
        }
      ],
      buttons: [{
        text: 'Aceptar',
        handler: async ({email}) => {

          if(!email) {return;}

          if( !await this.validarEmail(email)){
            this.toast.show({
              message: 'Contacto ya existe',
              icon: 'close',
              duration: 1500,
              position: 'bottom'
            });
            return;
          }
          this.loading.show('Agregando contacto');
          (await this.contactosSVc.addContact((email as string).toLowerCase())).subscribe(({success, msj}) => {
            this.loading.hide();
            if(success){
              this.traerContactos();
            }
            this.toast.show({
              message: msj,
              icon: success ? 'checkmark': 'close',
              duration: 1500,
              position: 'bottom'
            });
          });
        }
      },
      {
        role: 'cancel', text: 'Cancelar'
      }]
    });
    await alert.present();
  }

  async validarEmail(email:string){
    const { email: userEmail } = await this.storage.get('user');
    const [contactExists] = this.listaContactos.filter((contact: contacto) => contact.email === email);
   return (email !== userEmail && !contactExists);
  };


}
