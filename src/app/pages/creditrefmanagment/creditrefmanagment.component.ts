import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Creditrefuse } from 'src/app/model/creditrefuse.model';
import { CreditrefuseService } from 'src/app/service/creditrefuse.service';
@Component({
  selector: 'app-creditrefmanagment',
  templateUrl: './creditrefmanagment.component.html',
  styleUrls: ['./creditrefmanagment.component.scss']
})
export class CreditrefmanagmentComponent {
  isReady:boolean=false;
  listofCredit:Creditrefuse[];
  displayedColumns = ['creditId','montant','nbrdumois','montantparmois','dateDebut','dateFin','clientId','clientnom','clientprenom','agentId','agentnom'];
  dataSource: MatTableDataSource<Creditrefuse>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private cs:CreditrefuseService) { }
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
