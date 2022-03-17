import { compare, email, required } from '@rxweb/reactive-form-validators';

export class RegisterModel {

    @required({message: 'campo requerido'})
    nombres: string;

    @required({message: 'campo requerido'})
    apellidos: string;

    @email({message: 'el campo debe ser un email'})
    @required({message: 'campo requerido'})
    email: string;

    @required({message: 'campo requerido'})
    password: string;

    @required({message: 'campo requerido'})
    @compare({fieldName: 'password', message: 'contraseñas no coinciden'})
    repassword: string;

    @required({message: 'debe aceptar los teérminos y condiciones para continuar'})
    aceptarTerminos = false;

}