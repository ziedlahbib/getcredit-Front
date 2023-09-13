import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERole } from 'src/app/model/erole';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Observable } from 'rxjs';
import {  AsyncValidatorFn } from '@angular/forms';
import {  of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public userform!: FormGroup;
  erole=ERole;
  user:User;
  isReady=false;
  constructor(private us :UserServiceService ,private formBuilder: FormBuilder,
    private router:ActivatedRoute,private route:Router,private userService: UserService) { }

  ngOnInit(): void {
    this.get(this.router.snapshot.params['id']);
  }
  initForm(data) {
    this.userform = this.formBuilder.group({
      username: [data.username, [Validators.required],[this.usernameValidator]],
      nom: [data.nom, Validators.required],
      prenom: [data.prenom, Validators.required],
      email: [data.email, [Validators.required,Validators.email],[this.emailValidator]],
      tel: [data.tel, Validators.required],
      adresse: [data.adresse, Validators.required],
      roles: [data.roles.name, Validators.required],
  });
    

  this.userform.valueChanges.subscribe(
    data=>{
      console.log(this.userform?.value);
     
    }
  )
}
usernameValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const username = control.value;
  if (username==this.user.username) {
    // Return early if the username is empty
    return of(null);
  }
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
  if (username==this.user.email) {
    // Return early if the username is empty
    return of(null);
  }
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
get(id:number){
  this.us.getuserById(id ).subscribe(
    data => {

      this.user = data;
      console.log(data)
      this.isReady=true;
    this.initForm(data);

    }
  );
}
modifier(){
  this.us.updateuser(this.router.snapshot.params['id'],this.userform.value).subscribe(
    data=>{
      console.log(data);
      this.userService.setNom(data.nom);
      this.userService.setPrenom(data.prenom);
      this.route.navigate(['/affichlistuser']);
    }
  )
}
}
