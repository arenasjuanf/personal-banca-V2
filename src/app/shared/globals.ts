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

    static getTipoAhorro = (id: number) => (
        this.tiposAhorro.find( (tipo: TipoAhorroModel) => tipo.id === id)?.nombre || '---'
    );
}
