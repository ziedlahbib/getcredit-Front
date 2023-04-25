import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERole } from 'src/app/model/erole';
import { UserServiceService } from 'src/app/service/user-service.service';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public userform!: FormGroup;
  //erole=ERole;
  user:User;
  public role:string |null;
  constructor(private us :UserServiceService ,private formBuilder: FormBuilder,private route:Router) { }
  ngOnInit(): void {
    this.initForm();
    this.getrole();
   
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
    data=>{
      console.log(this.userform?.value);
     
    }
  )
}
ajouter(){
  this.us.ajoutuser(this.userform.value).subscribe(
    data=>{
      this.user=data;
      if(this.role=='ROLE_ENTREPRENEUR'){
        let token=localStorage.getItem('autorisation'|| '');
        let user:any=jwt_decode(token|| '');
        this.us.affecteruserentrepreneur(user.jti,this.user.id,this.user).subscribe(
          res=>{
            
          }
        );
        
      }
      this.route.navigate(['/affichlistuser']);
    }
  )
}
getrole(){
   this.role = localStorage.getItem('role' || '');
  console.log(this.role)
}
}
