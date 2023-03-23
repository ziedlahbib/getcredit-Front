import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-back',
  templateUrl: './footer-back.component.html',
  styleUrls: ['./footer-back.component.scss']
})
export class FooterBackComponent implements OnInit {

  test : Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
