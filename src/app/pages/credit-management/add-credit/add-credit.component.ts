import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Credit } from 'src/app/model/credit';
import { Produit } from 'src/app/model/produit';
import { User } from 'src/app/model/user';
import { CreditServiceService } from 'src/app/service/credit-service.service';
import { ProduitServiceService } from 'src/app/service/produit-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent implements OnInit {
  user:User;
  credit :Credit;
  produit:Produit;
  creidtform:FormGroup;
  clientform:FormGroup;
  isDisabled:boolean=true;
  uisReaydu:boolean=false;
  uisReaydp:boolean=false;
  constructor(private _formBuilder: FormBuilder,private us:UserServiceService,private router:ActivatedRoute, private route :Router,
    private cs:CreditServiceService,private ps :ProduitServiceService) {}
  ngOnInit(): void {
    this.getuserbyid();
    this.getproduitbyid();
    this.initform()

  }
  initform(){
    this. clientform = this._formBuilder.group({
      nom:[''],
      prenom:[''],
      adresse:[''],
      email:['']
  
  });
  this.clientform.valueChanges.subscribe(
    data => {
      console.log(this.clientform.value);

    }
  )
  }
  agentform: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  creditform(){
    console.log(this.produit)
    console.log(this.uisReaydp)
    this. creidtform = this._formBuilder.group({
      montant: [ this.produit.prix ],
      nbrdumois:['']
  
  });
  this.creidtform.valueChanges.subscribe(
    data => {
      console.log(this.creidtform.value);

    }
  )
  }
  
  getuserbyid(){
    let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{
        console.log(data)
        this.user=data;
        this.uisReaydu=true;

      }
    )
  }
  getproduitbyid(){
    this.ps.getProduitById(this.router.snapshot.params['id']).subscribe(
      data=>{
        console.log(this.router.snapshot.params['id'])
        this.produit=data;
        this.uisReaydp=true;
        this.creditform();

      }
    )
  }
  submit(){
    this.cs.ajoutCredit(this.creidtform.value).subscribe(
      data=>{
        this.credit=data;
        this.cs.affectecreditagent(data.creditId,this.user.id,data).subscribe(
          res=>{

          }
        )
        this.us.ajoutclient(this.clientform.value).subscribe(
          res=>{
            this.cs.affectecreditclient(data.creditId,res.id,data).subscribe(
              res=>{
    
              }
            )
          }
        )
        this.cs.affectecreditproduit(data.creditId,this.produit.produitId,data).subscribe(
          res=>{

          }
        )
        this.route.navigate(['/affichlistProduits'])
      }
    )
  }
}
