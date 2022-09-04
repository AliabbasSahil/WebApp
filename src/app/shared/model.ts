export class login{
    username : string;
    password : string;
    constructor(obj:any){
        this.username = obj && obj.username ? obj.username : null;
        this.password = obj && obj.password ? obj.password : null;
    }
}