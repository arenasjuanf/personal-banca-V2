/* eslint-disable @typescript-eslint/naming-convention */
import { date, numeric, prop, required } from '@rxweb/reactive-form-validators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class AhorroModel{

    @required({message: 'campo requerido'})
    @numeric({message: 'debe ingresar un número'})
    tipo: 1 | 2;

    @required({message: 'campo requerido'})
    nombre: string;

    @required({message: 'campo requerido'})
    @numeric({message: 'debe ingresar un número'})
    objetivo:  number;

    @required({message: 'campo requerido'})
    @numeric({message: 'debe ingresar un número'})
    ahorrado:  number;

    @required({message: 'campo requerido', conditionalExpression: (model: AhorroModel) => model.tipo_ahorro === 1})
    @numeric({message: 'debe ingresar un número'})
    intervalo:  number;

    @required({message: 'campo requerido'})
    @numeric({message: 'debe ingresar un número'})
    tipo_ahorro:  number;

    @required({message: 'campo requerido'})
    @date({message: 'debe ingresar una fecha'})
    fechaMeta:  Date;

    @prop()
    id?:  number;

    @prop()
    fk_id_usuario?:  number;

    @prop()
    created_at?: Timestamp<any>;

    @prop()
    updated_at?: Timestamp<any>;
}
