import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { ERole } from 'src/app/model/erole';

@Component({
  selector: 'app-entreprise-management',
  templateUrl: './entreprise-management.component.html',
  styleUrls: ['./entreprise-management.component.scss']
})
export class EntrepriseManagementComponent implements OnInit {

  listofEntreprise:Entreprise[];
  displayedColumns = ['entrpriseId','nom','numfisc', 'adresse','option'];
  dataSource: MatTableDataSource<Entreprise>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private es:EntrepriseServiceService,private us:UserServiceService) { }
  ngOnInit(): void {
   this.getentreprise();
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getentreprise(){
    let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{
        if(data.roles.name==ERole.ROLE_ADMIN){
          this.es.getEntreprises().subscribe(
            res=>{
              this.listofEntreprise=res;
              this.dataSource=new MatTableDataSource(this.listofEntreprise);
              this.dataSource._renderChangesSubscription;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          )
        }else if(data.roles.name==ERole.ROLE_ENTREPRENEUR){
          this.es.getEntrepriseByentrepreneur(data.id).subscribe(
            res=>{
              this.listofEntreprise=res;
              this.dataSource=new MatTableDataSource(this.listofEntreprise);
              this.dataSource._renderChangesSubscription;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          )
        }

  }
  )
  }
  supprimer(entreprise :any){
    this.es.deleteEntreprise(entreprise.entrpriseId).subscribe(()=>this.es.getEntreprises().subscribe(
      data=>{
        this.listofEntreprise=data
        this.dataSource = new MatTableDataSource(this.listofEntreprise);
      }
    )
    );
  }
}
