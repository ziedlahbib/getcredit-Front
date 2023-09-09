import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/model/produit';
import { ProduitServiceService } from 'src/app/service/produit-service.service';

@Component({
  selector: 'app-updateproduit',
  templateUrl: './updateproduit.component.html',
  styleUrls: ['./updateproduit.component.scss']
})
export class UpdateproduitComponent {
  public produiteform: FormGroup;
  public isReady :boolean=false;
  public produit:Produit
  constructor(private ps: ProduitServiceService ,private formBuilder: FormBuilder,
    private router:ActivatedRoute,private route:Router) { }
    ngOnInit(): void {
      this.get(this.router.snapshot.params['id'])

    }
    initForm(data) {
      this.produiteform = this.formBuilder.group({
        nom: [data.nom, Validators.required],
        prix: [data.prix, Validators.required],
      });
  
  
      this.produiteform.valueChanges.subscribe(
        data => {
          console.log(this.produiteform.value);
  
        }
      )
    }
    get(id:number){
      this.ps.getProduitById(id ).subscribe(
        data => {
    
          this.produit = data;
          console.log(data);
          this.isReady=true
        this.initForm(data);
    
        }
      );
    }
    modifier(){
      this.ps.updateProduit(this.router.snapshot.params['id'],this.produiteform.value).subscribe(
        data=>{
          console.log(data);
          this.route.navigate(['/affichlistProduits']);
        }
      )
    }
}
