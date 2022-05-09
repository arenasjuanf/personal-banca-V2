import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { contacto } from 'src/app/pages/contactos/contactos.page';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contacts-chooser',
  templateUrl: './contacts-chooser.component.html',
  styleUrls: ['./contacts-chooser.component.scss'],
})
export class ContactsChooserComponent implements OnInit {

  @Input() idAhorro: number;
  listaContactos: any[];
  users: any[] = [];

  constructor(
    private contactosSVc: ContactsService,
    private storage: StorageService,
    private router: Router,
    private modal: ModalController,
    private popOver: PopoverController,
    private ahorrosSvc: AhorrosService,
    private toast: ToastService,
    private loader: LoadingService
  ) {
  }

  ngOnInit() {
    this.traerContactos();
    this.traerUsuariosAhorro();
  }

  async traerContactos(){
    const { id: userId } = await this.storage.get('user');
    this.contactosSVc.getContacts(userId).subscribe((contactos: contacto[]) => {
      this.listaContactos = contactos;
    });
  }

  goContacts(){
    this.popOver.dismiss();
    this.modal.dismiss();
    this.router.navigateByUrl('/pages/contactos');
  }

  selectContact(contact: contacto){
    const remove = this.isSelected(contact);
    this.loader.show(`${remove ? 'Removiendo' : 'Agregando'} Contacto`);

    this.ahorrosSvc.shareSaving(contact.idUser, this.idAhorro, remove).subscribe(({success, msj}) => {

      this.loader.hide();
      if(success){
        this.traerUsuariosAhorro();
      }

      this.toast.show({
        message: msj,
        icon: success ? 'checkmark' : 'close',
        duration: 1500,
        position: 'bottom'
      });

    });
  }

  traerUsuariosAhorro(){
    this.ahorrosSvc.getSharedSavingsUsers(this.idAhorro).subscribe((users) => this.users = users);
  }

  isSelected(contact: contacto): boolean {
    return this.users.filter( user => user.fk_id_usuario === contact.idUser ).length ? true : false;
  }



}
