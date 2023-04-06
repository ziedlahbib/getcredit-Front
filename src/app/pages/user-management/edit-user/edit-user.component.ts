import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERole } from 'src/app/model/erole';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

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
  constructor(private us :UserServiceService ,private formBuilder: FormBuilder,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.get(this.router.snapshot.params['id']);
  }
  initForm(data) {
    this.userform = this.formBuilder.group({
      username: [data.username, Validators.required],
      nom: [data.username, Validators.required],
      prenom: [data.username, Validators.required],
      email: [data.username, Validators.required],
      tel: [data.username, Validators.required],
      adresse: [data.username, Validators.required],
      roles: [data.username, Validators.required],
  });
    

  this.userform.valueChanges.subscribe(
    data=>{
      console.log(this.userform?.value);
     
    }
  )
}
get(id:number){
  this.us.getuserById(id ).subscribe(
    data => {

      this.user = data;
      this.isReady=true;
    this.initForm(data);

    }
  );
}
modifier(){
  this.us.updateuser(this.router.snapshot.params['id'],this.userform.value).subscribe(
    data=>{
      console.log(data);
      this.route.navigate(['/affichlistuser']);
    }
  )
}
}
