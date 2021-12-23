export class User {
    public constructor(
        public _id?: string,
        public nombres?: string,
        public apellidos?: string,
        public dni?: string,
        public area?: string,//
        public cedula?: string,
        public password?: string,
        public correo?:string,
        public estado?:string,
        public rol?:string,
        public passwordnew?:string
        ) {

    }
}
