import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Credit } from 'src/app/model/credit';
import { CreditServiceService } from 'src/app/service/credit-service.service';

@Component({
  selector: 'app-credit-management',
  templateUrl: './credit-management.component.html',
  styleUrls: ['./credit-management.component.scss']
})

export class CreditManagementComponent implements OnInit {
  listofCredit:Credit[];
  displayedColumns = ['creditId','montant','nbrdumois','montantparmois','dateDebut','dateFin','clientId','clientnom','clientprenom','agentId','agentnom'];
  dataSource: MatTableDataSource<Credit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private cs:CreditServiceService) { }
  ngOnInit(): void {
    this.getcredits()
  
  }
  getcredits(){
    this.cs.getCredits().subscribe(
      data=>{
        this.listofCredit=data;
        this.dataSource=new MatTableDataSource(this.listofCredit);
        this.dataSource._renderChangesSubscription;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
