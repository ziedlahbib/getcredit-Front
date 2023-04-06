import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.scss']
})
export class AddEntrepriseComponent implements OnInit {

  public entreprsieform: FormGroup;
  constructor(private es: EntrepriseServiceService, private formBuilder: FormBuilder, private route: Router) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.entreprsieform = this.formBuilder.group({
      nom: ['', Validators.required],
      numfisc: ['', Validators.required],
      adresse: ['', Validators.required],
    });


    this.entreprsieform.valueChanges.subscribe(
      data => {
        console.log(this.entreprsieform.value);

      }
    )
  }
  ajouter() {
    this.es.ajoutEntreprise(this.entreprsieform.value).subscribe(
      data => {
        console.log(data);
        let token = localStorage.getItem('autorisation' || '');
        let user: any = jwt_decode(token || '');
        console.log('sss', user.jti);
        this.es.affectentrepriseuser(user.jti,data.entrpriseId,data).subscribe(
          res=>{
            this.route.navigate(['/affichlistEntreprise']);
          }
        )
        this.route.navigate(['/affichlistEntreprise']);
      }
    )
  }
}
