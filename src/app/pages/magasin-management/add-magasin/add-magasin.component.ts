import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-add-magasin',
  templateUrl: './add-magasin.component.html',
  styleUrls: ['./add-magasin.component.scss']
})
export class AddMagasinComponent implements OnInit {
  public magasinform: FormGroup;
  public entform :FormGroup;
  listofEntreprise:Entreprise[];
  constructor(private ms: MagasinServiceService, private formBuilder: FormBuilder, private route: Router,
    private es:EntrepriseServiceService,private us:UserServiceService) { }
  ngOnInit(): void {
    this.initForm();
    this.entrepriseform();
    this.getentreprise();
  }
  initForm() {
    this.magasinform = this.formBuilder.group({
      addresse: ['', Validators.required],
    });


    this.magasinform.valueChanges.subscribe(
      data => {
        console.log(this.magasinform.value);

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
    this.ms.ajoutMagasin(this.magasinform.value).subscribe(
      data => {
        const value = this.entform.get(['entrpriseId'])?.value
        console.log(value)
        this.ms.affectemaghasinentreprise(data.magasinId,value,data).subscribe(
           res=>{

          }
         )
        console.log(data);
        this.route.navigate(['/affichlistMagasins']);
      }
    )
  }
  getentreprise(){
    let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{

          this.es.getEntrepriseByentrepreneur(data.id).subscribe(
            res=>{
              this.listofEntreprise=res;
 
            }
          )
        }
  )
  }
}
