import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { ERole } from 'src/app/model/erole';
import { Magasin } from 'src/app/model/magasin';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-entreprise-management',
  templateUrl: './entreprise-management.component.html',
  styleUrls: ['./entreprise-management.component.scss']
})
export class EntrepriseManagementComponent implements OnInit {

  isReadyM:Boolean=false;
  isReadyU:Boolean=false;
  userconn:User;
  public role: string | null;
  public ERole=ERole ;
  listofEntreprise:Entreprise[];
  displayedColumns = ['entrpriseId','nom','numfisc', 'adresse','option'];
  dataSource: MatTableDataSource<Entreprise>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private es:EntrepriseServiceService,private us:UserServiceService,private ms :MagasinServiceService) { }
  ngOnInit(): void {
   this.getentreprise();
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
  activer(id:number,user:User){
    console.log(user)
    this.us.activeruser(id,user).subscribe(()=>  this.us.getuserBymagasin(user.magasin.magasinId).subscribe(
      res=>{
        this.usersListparmagasin=res;
        this.dataSourceusersListparmagasin=new MatTableDataSource(this.usersListparmagasin);
        this.dataSourceusersListparmagasin._renderChangesSubscription;
        this.dataSourceusersListparmagasin.paginator = this.paginatorusersListparmagasin;
        this.dataSourceusersListparmagasin.sort = this.sortusersListparmagasin;
        this.verifierUserMagasin(this.listofMagasins,res);
      }
    ));
  }
  desaactiver(id:number,user:User){
    this.us.desactiveruser(id,user).subscribe(()=>  this.us.getuserBymagasin(user.magasin.magasinId).subscribe(
      res=>{
        this.usersListparmagasin=res;
        this.dataSourceusersListparmagasin=new MatTableDataSource(this.usersListparmagasin);
        this.dataSourceusersListparmagasin._renderChangesSubscription;
        this.dataSourceusersListparmagasin.paginator = this.paginatorusersListparmagasin;
        this.dataSourceusersListparmagasin.sort = this.sortusersListparmagasin;
        this.verifierUserMagasin(this.listofMagasins,res);
      }
    )
    );
  }
  getrole() {
    this.role = localStorage.getItem('role' || '');
    console.log(this.role)
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
  isEntrepreneur():boolean{
    let role=localStorage.getItem('role'|| '');
    return role=="ROLE_ENTREPRENEUR"
}
isAdmin():boolean{
  let role=localStorage.getItem('role'|| '');
  return role=="ROLE_ADMIN"
}
  handleRowClickmagasin(rowData: any) {
    console.log('Row clicked:', rowData);
    // Call your function here
    this.myFunctionmagasin(rowData);
  }
  myFunctionmagasin(rowData:any) {
    console.log('Function called');
    // Do something here
    this.ms.getmagasinsbyentreprise(rowData.entrpriseId).subscribe(
      res=>{
        console.log(res)
        this.listofMagasins=res;
        this.dataSourcemagasin=new MatTableDataSource(this.listofMagasins);
        this.dataSourcemagasin._renderChangesSubscription;
        this.dataSourcemagasin.paginator = this.paginatormagasin;
        this.dataSourcemagasin.sort = this.sortmagasin;
        this.verifierMagasin(this.listofEntreprise,res);
      }
    )
  
  }
/////////////////////////////////magasin////////////////:
listofMagasins:Magasin[];
displayedColumnsmagasin = ['magasinId','addresse','option'];
dataSourcemagasin: MatTableDataSource<Magasin>;
@ViewChild(MatPaginator) paginatormagasin: MatPaginator;
@ViewChild(MatSort) sortmagasin: MatSort;
applyFiltermagasin(event: Event) {
  let filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSourcemagasin.filter = filterValue;
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
      this.verifierUserMagasin(this.listofMagasins,res);
    }
  )

}
////////////////////////////////userparmagasin////////////////
usersListparmagasin:User[]=[];
displayedColumnsusersListparmagasin = ['id','username','nom', 'prenom','adresse','tel','email','role','magasinid','entrepriseid','entrepreneurid','option'];
dataSourceusersListparmagasin: MatTableDataSource<User>;
@ViewChild(MatPaginator) paginatorusersListparmagasin: MatPaginator;
@ViewChild(MatSort) sortusersListparmagasin: MatSort;
applyFilterusersListparmagasin(event: Event) {
  let filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSourceusersListparmagasin.filter = filterValue;
}
//////////////////verifiermagasin/////////////
verifierMagasin(listE:Entreprise[],listM:Magasin[]){ 
  if(  listM.length>0){
    this.isReadyM=true;
    console.log('M',this.isReadyM)
  }else if(listM.length==0){
    this.isReadyM=false;
    console.log('M',this.isReadyM)
  }
  }
    //////////////////verifierusermagasin/////////////
    verifierUserMagasin(listM:Magasin[],listU:User[]){
      if(  listM.length>0){
        this.isReadyM=true;
        console.log('M',this.isReadyM)
      }else if(listM.length==0){
        this.isReadyM=false;
        console.log('M',this.isReadyM)
      }
      if(  listU.length>0){
        this.isReadyU=true;
        console.log('U',this.isReadyU)
      }else if(listU.length==0){
        this.isReadyU=false;
        console.log('U',this.isReadyU)
      }
      }
}
