import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ERole } from 'src/app/model/erole';
import { Magasin } from 'src/app/model/magasin';
import { User } from 'src/app/model/user';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-magasin-management',
  templateUrl: './magasin-management.component.html',
  styleUrls: ['./magasin-management.component.scss']
})
export class MagasinManagementComponent implements OnInit {

  isReadyU:Boolean=false;
  userconn:User;
  public ERole=ERole ;
  listofMagasins:Magasin[];
  displayedColumns = ['magasinId','addresse','option'];
  dataSource: MatTableDataSource<Magasin>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ms:MagasinServiceService,private us:UserServiceService) { }
  ngOnInit(): void {
    this.getmagasins();
    let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{
        console.log('user',data)
        this.userconn=data;
      }
    );
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getmagasins(){
    this.ms.getMagasins().subscribe(
      data=>{
        this.listofMagasins=data;
        this.dataSource=new MatTableDataSource(this.listofMagasins);
        this.dataSource._renderChangesSubscription;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  supprimer(magasin :any){
    this.ms.deleteMagasin(magasin.magasinId).subscribe(()=>this.ms.getMagasins().subscribe(
      data=>{
        this.listofMagasins=data
        this.dataSource = new MatTableDataSource(this.listofMagasins);
      }
    )
    );
  }
  handleRowClickusermagasin(rowData: any) {
    console.log('Row clicked:', rowData);
    // Call your function here
    this.myFunctionusermagasin(rowData);
  }
  myFunctionusermagasin(rowData:any) {
    console.log('Function called');
    // Do something here
    this.us.getuserBymagasin(rowData.magasinId).subscribe(
      res=>{
        this.usersListparmagasin=res;
        this.dataSourceusersListparmagasin=new MatTableDataSource(this.usersListparmagasin);
        this.dataSourceusersListparmagasin._renderChangesSubscription;
        this.dataSourceusersListparmagasin.paginator = this.paginatorusersListparmagasin;
        this.dataSourceusersListparmagasin.sort = this.sortusersListparmagasin;
        this.verifierUserMagasin(res);
      }
    )
  
  }
  ////////////////////////////////userparmagasin////////////////
  usersListparmagasin:User[]=[];
displayedColumnsusersListparmagasin = ['id','username','nom', 'prenom','adresse','tel','email','role','option'];
dataSourceusersListparmagasin: MatTableDataSource<User>;
@ViewChild(MatPaginator) paginatorusersListparmagasin: MatPaginator;
@ViewChild(MatSort) sortusersListparmagasin: MatSort;
applyFilterusersListparmagasin(event: Event) {
  let filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSourceusersListparmagasin.filter = filterValue;
}
//////////////////verifierusermagasin/////////////
verifierUserMagasin(listU:User[]){
  if(  listU.length>0){
    this.isReadyU=true;
    console.log('U',this.isReadyU)
  }else if(listU.length==0){
    this.isReadyU=false;
    console.log('U',this.isReadyU)
  }
  }
  isEntrepreneur():boolean{
    let role=localStorage.getItem('role'|| '');
    return role=="ROLE_ENTREPRENEUR"
}
isAdmin():boolean{
  let role=localStorage.getItem('role'|| '');
  return role=="ROLE_ADMIN"
}
}
