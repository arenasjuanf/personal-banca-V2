/* eslint-disable @typescript-eslint/naming-convention */
import {  numeric, prop, required } from '@rxweb/reactive-form-validators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class AhorroModel {

    @required({message: 'campo requerido'})
    tipo: number = 1; // 1 ahorro | 2 deuda

    @required({message: 'campo requerido'})
    nombre: string;
    
    @required({message: 'campo requerido'})
    @numeric({message: 'debe ingresar un número'})
    objetivo:  number;

    @numeric({message: 'debe ingresar un número'})
    ahorrado?:  number;

    @required({message: 'campo requerido', conditionalExpression: (model: AhorroModel) => model.tipo_ahorro === 2})
    @numeric({message: 'debe ingresar un número'})
    intervalo:  number;

    @required({message: 'campo requerido'})
    @numeric({message: 'debe ingresar un número'})
    tipo_ahorro: 1 | 2 | 3;

    @prop()
    requiereFecha: boolean;

    @required({message: 'campo requerido',  conditionalExpression: (model: AhorroModel) => !model.requiereFecha})
    fechaMeta: string;

    @prop()
    id?:  number;

    @prop()
    fk_id_usuario?:  number;

    @prop()
    created_at?: Timestamp<any>;

    @prop()
    updated_at?: Timestamp<any>;
}
