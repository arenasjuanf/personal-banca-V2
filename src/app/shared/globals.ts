import { TipoAhorroModel } from '../models/tipoAhorro.model';

export abstract class Globals{
    static tiposAhorro: TipoAhorroModel[] = [

        {
            nombre: 'Libre',
            id: 1
        },
        {
            nombre: 'Programado',
            id: 2
        },
        {
            nombre: 'Indefinido',
            id: 3
        }

    ];

    static appPages: {title: string; url: string; icon: string}[] = [
        { title: 'Home', url: '/pages/home', icon: 'home' },
        { title: 'Agregar', url: '/pages/agregar', icon: 'add' },
        { title: 'Ahorros', url: '/pages/ahorros', icon: 'wallet' },
        { title: 'Deudas', url: '/pages/deudas', icon: 'cash' },
        { title: 'Noticias', url: '/pages/noticias', icon: 'newspaper' },
        { title: 'Contactos', url: '/pages/contactos', icon: 'people'}
    ];

    static getTipoAhorro = (id: number) => (
        this.tiposAhorro.find( (tipo: TipoAhorroModel) => tipo.id === id)?.nombre || '---'
    );
}
