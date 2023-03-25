import { Entreprise } from "./Entreprise";
import { Produit } from "./Produit";

export class Magasin {
    magasinId?:Number;
    addresse?:String;
    produits?:Produit[];
    entreprise?:Entreprise;
}