import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERole } from 'src/app/model/erole';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-updateclient',
  templateUrl: './updateclient.component.html',
  styleUrls: ['./updateclient.component.scss']
})
export class UpdateclientComponent {
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
      nom: [data.nom, Validators.required],
      prenom: [data.prenom, Validators.required],
      email: [data.email, [Validators.required,Validators.email]],
      adresse: [data.adresse, Validators.required],
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
      console.log(data)
      this.isReady=true;
    this.initForm(data);

    }
  );
}
modifier(){
  this.us.updateClient(this.router.snapshot.params['id'],this.userform.value).subscribe(
    data=>{
      console.log(data);
      this.route.navigate(['/affichlistuser']);
    }
  )
}
}
