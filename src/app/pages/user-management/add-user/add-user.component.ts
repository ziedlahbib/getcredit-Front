import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERole } from 'src/app/model/erole';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public userform!: FormGroup;
  erole=ERole;
  constructor(private us :UserServiceService ,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.initForm();
    console.log(this.erole)
   
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
      roles: ['', Validators.required],
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
      console.log(data)
    }
  )
}
}
