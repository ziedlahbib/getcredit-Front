import { Entreprise } from "./entreprise";
import { Produit } from "./produit";

export class Magasin {
    magasinId?:Number;
    addresse?:String;
    produits?:Produit[];
    entreprise?:Entreprise;
}