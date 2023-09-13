import { Component, HostListener, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { UserServiceService } from 'src/app/service/user-service.service';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/model/user';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.scss']
})
export class NavbarBackComponent implements OnInit {

  nom: String = '';
  prenom: String = '';
  user: User;
  items: MenuItem[]=[];
  item: MenuItem[]=[];
  isReady=false;
  constructor(private us : UserServiceService,
    private authenticationService: AuthServiceService,private router :Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getuserbyid();
    this.item = [
        {
            label:'Accueil',
            icon:'pi pi-home',
            routerLink:'/home',
  
        },];
        this.userService.nom$.subscribe((nom) => {
          this.nom = nom;
        });
    
        this.userService.prenom$.subscribe((prenom) => {
          this.prenom = prenom;
        });
  }
getuserbyid(){
  let token=localStorage.getItem('autorisation'|| '');
  let user:any=jwt_decode(token|| '');
  this.us.getuserById(user.jti).subscribe(
    data=>{
      this.user=data;
      this.nom=data.nom;
      this.prenom=data.prenom
      this.isReady=true;
      this.items = [

        {
            items:[
                {
                    label:'profil',
                    icon:'pi pi-user',
                    command: (event) => this.navigateToItem(this.user.id),
                    
    
                },
                {
                    label:'se déconnecter',
                    icon:'pi pi-sign-out',
                    routerLink: '/login',
                    command: () => this.logout()
                },
    
            ]
        },
    ];
    }
  )
}
navigateToItem(itemId: Number) {
  this.router.navigate(['/edit-user', itemId]);
}
logout(){
  this.authenticationService.logout();
}
menuStyle: any = {};
@HostListener('window:scroll')
onWindowScroll() {
  const menu = document.querySelector('.p-menu') as HTMLElement;
  if (menu) {
    const button = document.querySelector('.p-button') as HTMLElement;
    const buttonRect = button.getBoundingClientRect();
    const top = buttonRect.bottom + window.scrollY;
    const left = buttonRect.left + window.scrollX;
    this.menuStyle = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
    };
  }
}
}
