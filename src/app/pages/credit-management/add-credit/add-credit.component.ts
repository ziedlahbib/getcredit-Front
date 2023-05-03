import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent implements OnInit {
  user:User;
  constructor(private _formBuilder: FormBuilder,private us:UserServiceService,private router:ActivatedRoute,
    ) {}
  ngOnInit(): void {
    this.getuserbyid();
  }
  agentform: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  creidtform: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  getuserbyid(){
    let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{
        this.user=data;

      }
    )
  }
}
