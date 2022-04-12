import { email, prop, required } from '@rxweb/reactive-form-validators';

export class LoginModel {
    @prop()
    @email({message: 'el campo debe ser un email'})
    @required({message: 'campo requerido'})
    email = 'juanfa107@gmail.com';

    @prop()
    @required({message: 'campo requerido'})
    password = 'Juanf123';

    @prop()
    mantenerSesion = false;
}
