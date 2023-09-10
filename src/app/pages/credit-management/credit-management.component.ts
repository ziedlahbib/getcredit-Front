import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Credit } from 'src/app/model/credit';
import { ERole } from 'src/app/model/erole';
import { User } from 'src/app/model/user';
import { CreditServiceService } from 'src/app/service/credit-service.service';
import jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-credit-management',
  templateUrl: './credit-management.component.html',
  styleUrls: ['./credit-management.component.scss']
})

export class CreditManagementComponent implements OnInit {
  isReady:boolean=false;
  listofCredit:Credit[];
  userconn:User;
  public role: string | null;
  public ERole=ERole ;
  displayedColumns = ['creditId','montant','iban','nbrdumois','montantparmois','dateDebut','dateFin','clientId','clientnom','clientprenom','agentId','agentnom','option'];
  dataSource: MatTableDataSource<Credit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private cs:CreditServiceService,private us:UserServiceService) { }
  ngOnInit(): void {
    this.getcredits();
    let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{
        console.log('user',data)
        this.userconn=data;
      }
    );
    this.getrole();
  
  }
  getrole() {
    this.role = localStorage.getItem('role' || '');
    console.log(this.role)
  }
  getcredits(){
    this.cs.getCredits().subscribe(
      data=>{
        this.listofCredit=data;
        this.dataSource=new MatTableDataSource(this.listofCredit);
        this.dataSource._renderChangesSubscription;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isReady=true
      }
    )
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
