import { Produit } from "./produit";
import { User } from "./user";

export class Creditrefuse {
    creditId:Number;
    montant:String;
    restapayer:Number;
    montantparmois:Number;
    dateDebut:Date;
    dateFin:Date;
    client:User;
    agentr:User;
    produit :Produit
}
