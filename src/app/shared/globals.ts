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
}