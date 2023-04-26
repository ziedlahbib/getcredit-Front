import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERole } from 'src/app/model/erole';
import { UserServiceService } from 'src/app/service/user-service.service';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/model/user';
import { Magasin } from 'src/app/model/magasin';
import { Entreprise } from 'src/app/model/entreprise';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  matFormFieldHidePlaceholder: boolean = false;
  public userform!: FormGroup;
  public magform: FormGroup;
  public entform: FormGroup;
  user: User;
  listofMagasin: Magasin[] = [];
  listofEntreprise: Entreprise[]
  public role: string | null;
  constructor(private us: UserServiceService, private formBuilder: FormBuilder, private route: Router,
    private es: EntrepriseServiceService, private ms: MagasinServiceService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.initForm();
    this.magasinform();
    this.entrepriseform();
    this.getrole();
    this.getentreprise();

  }
  initForm() {
    this.userform = this.formBuilder.group({
      username: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      tel: ['', Validators.required],
      adresse: ['', Validators.required],
      role: ['', Validators.required],
    });


    this.userform.valueChanges.subscribe(
      data => {
        console.log(this.userform?.value);

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

    if (this.role == 'ROLE_ENTREPRENEUR') {
      this.us.ajoutuser(this.userform.value).subscribe(
        data => {
          this.user = data;
          let token = localStorage.getItem('autorisation' || '');
          let user: any = jwt_decode(token || '');
          this.us.affecteruserentrepreneur(data.id, user.jti, data).subscribe(
            res => {
              console.log('ssssss', res)
              this.us.affecteragentmagasin(data.id, this.magform.get('magasinId')?.value, data).subscribe(
                val => {
                  console.log(val)
                  this.route.navigate(['/affichlistuser']);
                }
              )
            }
          )
        }
      )
    } else if (this.role == 'ROLE_ADMIN') {
      this.us.ajoutuser(this.userform.value).subscribe(
        v => {
          this.route.navigate(['/affichlistuser']);
        }
      )
    }

  }
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
  // isloading(list:Magasin[]):Boolean{
  //   return list.length>0

  //   }
}

