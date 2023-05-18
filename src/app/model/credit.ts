import { Produit } from "./produit";
import { User } from "./user";

export class Credit {
    creditId:Number;
    montant:String;
    restapayer:Number;
    montantparmois:Number;
    dateDebut:Date;
    dateFin:Date;
    user:User;
    agent:User;
    produit :Produit
}