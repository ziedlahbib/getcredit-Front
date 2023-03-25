import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { UserServiceService } from 'src/app/service/user-service.service';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/model/user';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.scss']
})
export class NavbarBackComponent implements OnInit {

  
  user?: User;
  items: MenuItem[]=[];
  item: MenuItem[]=[];
  constructor(private us : UserServiceService,private authenticationService: AuthServiceService) { }

  ngOnInit(): void {
    this.getuserbyid();
    this.item = [
        {
            label:'home',
            icon:'pi pi-home',
            routerLink:'/home',
  
        },];
    this.items = [

        {
            items:[
                {
                    label:'profil',
                    icon:'pi pi-user'
    
                },
                {
                    label:'logout',
                    icon:'pi pi-sign-out',
                    routerLink: '/login',
                    command: () => this.logout()
                },
    
            ]
        },
    ];
  }
getuserbyid(){
  let token=localStorage.getItem('autorisation'|| '');
  let user:any=jwt_decode(token|| '');
  console.log('sss',user.jti);
  this.us.getuserById(user.jti).subscribe(
    data=>{
      console.log(data)
      this.user=data;
    }
  )
}
logout(){
  this.authenticationService.logout();
}
}
