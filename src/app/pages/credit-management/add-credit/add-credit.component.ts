import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  uisReaydu:boolean=false;
  uisReaydp:boolean=false;
  constructor(private _formBuilder: FormBuilder,private us:UserServiceService,private router:ActivatedRoute,
    private cs:CreditServiceService,private ps :ProduitServiceService) {}
  ngOnInit(): void {
    this.getuserbyid();
    this.getproduitbyid()
  }
  agentform: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  creidtform: FormGroup = this._formBuilder.group({secondCtrl: ['']});
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

      }
    )
  }
}
