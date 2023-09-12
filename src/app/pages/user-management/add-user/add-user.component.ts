import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { Observable } from 'rxjs';
import {  AsyncValidatorFn } from '@angular/forms';
import {  of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';


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
  isConfirmed:boolean=true;
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
  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
usernameValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const username = control.value;

  if (!username) {
    // Return early if the username is empty
    return of(null);
  }

  // Use debounceTime to delay the request to avoid making too many requests
  return of(username).pipe(
    debounceTime(300), // Adjust debounce time as needed
    switchMap(username => {
      return this.us.getuserByusername(username).pipe(
        map(response => {
          return response ? { usernameTaken: true } : null;
        }),
        catchError(() => of(null)) // Handle errors gracefully, return null for non-HTTP errors
      );
    })
  );
};
emailValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const username = control.value;

  if (!username) {
    // Return early if the username is empty
    return of(null);
  }

  // Use debounceTime to delay the request to avoid making too many requests
  return of(username).pipe(
    debounceTime(300), // Adjust debounce time as needed
    switchMap(username => {
      return this.us.getuserByemail(username).pipe(
        map(response => {
          return response ? { emailTaken: true } : null;
        }),
        catchError(() => of(null)) // Handle errors gracefully, return null for non-HTTP errors
      );
    })
  );
};
  initForm() {
    this.userform = this.formBuilder.group({
      username: ['', [Validators.required],[this.usernameValidator]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required],[this.emailValidator]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      tel: ['', Validators.required],
      adresse: ['', Validators.required],
      role: ['', Validators.required],
    }, {
      validator: this.ConfirmedValidator('password', 'confirmPassword')
    });


    this.userform.valueChanges.subscribe(
      data => {
        console.log(this.userform?.value);
        
      }
    )
    this.userform.get('username')?.valueChanges.subscribe((value) => {
      // You can log the value here to see if the function is called
      console.log(value);
    });
    
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

