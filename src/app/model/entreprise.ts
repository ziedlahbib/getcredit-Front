import { Magasin } from "./magasin";

export class Entreprise {
    entrpriseId?:Number;
    nom?:String;
    numfisc?:Number;
    adresse?:String;
    magasins?:Magasin[];
}