/* eslint-disable @typescript-eslint/naming-convention */
import {  numeric, prop, required } from '@rxweb/reactive-form-validators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class DeudaModel {

    @required({message: 'campo requerido'})
    tipo = 2; // 1 ahorro | 2 deuda

    @required({message: 'campo requerido'})
    nombre: string;

    @required({message: 'campo requerido'})
    @numeric({message: 'debe ingresar un número'})
    objetivo:  number;

    @numeric({message: 'debe ingresar un número'})
    ahorrado?:  number;


    @prop()
    requiereFecha = false;

    //  conditionalExpression: (model) => model.requiereFecha ? true : false
    @required({message: 'campo requerido'})
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
