import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitServiceService } from 'src/app/service/produit-service.service';
import jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent {
  public produiteform: FormGroup;
  constructor(private ps: ProduitServiceService, private formBuilder: FormBuilder, private route: Router,
    private us: UserServiceService) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.produiteform = this.formBuilder.group({
      nom: ['', Validators.required],
      reference: ['', Validators.required],
      prix: ['', Validators.required],
    });


    this.produiteform.valueChanges.subscribe(
      data => {
        console.log(this.produiteform.value);

      }
    )
  }
  ajouter() {
    this.ps.ajoutProduit(this.produiteform.value).subscribe(
      data => {
        console.log(data);
        let token = localStorage.getItem('autorisation' || '');
        let user: any = jwt_decode(token || '');
        console.log('sss', user.jti);
        this.us.getuserById(user.jti).subscribe(
         res=>{
          this.ps.affecterproduitmagasin(res.magasin.magasinId,data.produitId,data).subscribe(
            res=>{
              this.route.navigate(['/affichlistProduits']);
         }
        )

          }
        )
      }
    )
  }
}
