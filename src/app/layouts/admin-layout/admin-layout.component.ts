import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }
   w3_open() {

  (<HTMLInputElement>document.getElementById("menu")).style.display = "block"; 
  (<HTMLInputElement>document.getElementById("openNav")).style.display = 'none';
  (<HTMLInputElement>document.getElementById("openNav")).style.height = '57px';
  (<HTMLInputElement>document.getElementById("closeNav")).style.display = "inline-block";







  
  }
  
   w3_close() {

    (<HTMLInputElement>document.getElementById("menu")).style.display = "none";
   (<HTMLInputElement>document.getElementById("openNav")).style.display = "inline-block";
   (<HTMLInputElement>document.getElementById("closeNav")).style.display = "none";
  
  
  }
}
