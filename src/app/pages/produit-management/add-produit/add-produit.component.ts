import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitServiceService } from 'src/app/service/produit-service.service';
import jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { Magasin } from 'src/app/model/magasin';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent {

  
  matFormFieldHidePlaceholder: boolean = false;
  public magform: FormGroup;
  public entform: FormGroup;
  listofMagasin: Magasin[] = [];
  listofEntreprise: Entreprise[]
  public role: string | null;
  public produiteform: FormGroup;
  constructor(private ps: ProduitServiceService, private formBuilder: FormBuilder, private route: Router,
    private us: UserServiceService, 
    private es: EntrepriseServiceService, private ms: MagasinServiceService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.initForm();
    this.magasinform();
    this.entrepriseform();
    this.getrole();
    this.getentreprise();
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
  magasinform() {
    this.magform = this.formBuilder.group({
      magasinId: ['', Validators.required],
    });


    this.magform.valueChanges.subscribe(
      data => {
        console.log(this.magform.value);

      }
    )
  }
  entrepriseform() {
    this.entform = this.formBuilder.group({
      entrpriseId: ['', Validators.required],
    });


    this.entform.valueChanges.subscribe(
      data => {
        console.log(this.entform.value);

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
  ///////////////////////////////////////:
  getrole() {
    this.role = localStorage.getItem('role' || '');
    console.log(this.role)
  }
  getentreprise() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwt_decode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {

        this.es.getEntrepriseByentrepreneur(data.id).subscribe(
          res => {
            this.listofEntreprise = res;

          }
        )
      }
    )
  }
  getmagasins(event: MatSelectChange) {
    const value = event.value;
    //const value = this.entform.get(['entrpriseId'])?.value
    console.log(value)
    this.ms.getmagasinsbyentreprise(Number(value)).subscribe(
      res => {
        console.log(res)
        this.listofMagasin = res;
        // Make changes to the component's data
        this.matFormFieldHidePlaceholder = false;

        // Manually trigger a change detection cycle
        this.cdr.detectChanges();
      }
    )
  }
}
