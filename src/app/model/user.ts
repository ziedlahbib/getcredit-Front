import { Credit } from "./credit";
import { Creditrefuse } from "./creditrefuse.model";
import { Entreprise } from "./entreprise";

import { FileDB } from "./fileDB";
import { Magasin } from "./magasin";
import { Role } from "./role";

export class User {
    id:Number;
    username:String;
    nom:String;
    prenom:String;
    adresse:String;
    tel:String;
    email:String;
    password:String;
    resetToken:String;
    active:Boolean;
    roles:Role;
    files:FileDB[];
    agents:User[];
    entrepreneur:User
    entreprise:Entreprise[];
    magasin:Magasin;
    credits:Credit[];
    credit:Credit[];
    creditsref:Creditrefuse[];
    creditref:Creditrefuse[]

}