import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-modifier-mot-de-passe',
  templateUrl: './modifier-mot-de-passe.component.html',
  styleUrls: ['./modifier-mot-de-passe.component.scss']
})
export class ModifierMotDePasseComponent {
  message: String;
  invalidpw = false;
  Successpw = false
  user:User;
  public pwform: FormGroup;
  constructor(private us :UserServiceService ,private formBuilder: FormBuilder,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.get(this.router.snapshot.params['id']);
    this.initForm();
  }
  get(id:number){
    this.us.getuserById(id ).subscribe(
      data => {
  
        this.user = data;
      
  
      }
    );
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
  initForm() {
    this.pwform = this.formBuilder.group({
      oldpassword: ['',Validators.required],
      newpassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],

  },
  {
    validator: this.ConfirmedValidator('newpassword', 'confirmPassword')
  });
  this.pwform.valueChanges.subscribe(
    data=>{
      console.log(this.pwform.value)
    }
   
  )
}
update(){
  this.us.updatepassword(this.router.snapshot.params['id'],this.pwform.value).subscribe(

      (response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          const body: string = response.body;
          console.log('Response:', body);
          // Handle the string response
          if(body=="Mot de passe mis à jour avec succès"){
            this.invalidpw = false;
            this.Successpw = true;
            this.message = body;
          }else if(body=="Ancien mot de passe invalide"){
            this.invalidpw = true;
            this.Successpw = false;
            this.message = body;
          }
        }
      });
  
}
}
