import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';

@Component({
  selector: 'app-updateentreprise',
  templateUrl: './updateentreprise.component.html',
  styleUrls: ['./updateentreprise.component.scss']
})
export class UpdateentrepriseComponent {
  
  public entreprsieform: FormGroup;
  public entreprise:Entreprise;
  public isReady :boolean=false;
  constructor(private es: EntrepriseServiceService, private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute) { }
    ngOnInit(): void {
      this.get(this.router.snapshot.params['id'])

    }
    initForm(data) {
      this.entreprsieform = this.formBuilder.group({
        nom: [data.nom, Validators.required],
        numfisc: [data.numfisc, Validators.required],
        adresse: [data.adresse, Validators.required],
      });
  
  
      this.entreprsieform.valueChanges.subscribe(
        data => {
          console.log(this.entreprsieform.value);
  
        }
      )
    }
    get(id:number){
      this.es.getEntrepriseById(id ).subscribe(
        data => {
    
          this.entreprise = data;
          console.log(data);
          this.isReady=true
        this.initForm(data);
    
        }
      );
    }
    modifier(){
      this.es.updateEntreprise(this.router.snapshot.params['id'],this.entreprsieform.value).subscribe(
        data=>{
          console.log(data);
          this.route.navigate(['/affichlistEntreprise']);
        }
      )
    }
}
