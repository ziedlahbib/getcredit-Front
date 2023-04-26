import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwt_decode from "jwt-decode";
import { Role } from 'src/app/model/role';
import { ERole } from 'src/app/model/erole';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { Magasin } from 'src/app/model/magasin';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public ERole=ERole ;
  usersList:User[]=[];
  userconn:User;
  displayedColumns = ['id','username','nom', 'prenom','adresse','tel','email','role','option'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private us:UserServiceService,private es:EntrepriseServiceService,private ms :MagasinServiceService) { }

  ngOnInit(): void {
    this.getuser();
  
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
getuser() {
  let token=localStorage.getItem('autorisation'|| '');
  let user:any=jwt_decode(token|| '');
  this.us.getuserById(user.jti).subscribe(
    data=>{
      console.log('user',data)
      this.userconn=data;
      if(this.userconn.roles.name==ERole.ROLE_ADMIN){
        this.us.getusers().subscribe(
          res=>{
    
            this.usersList=res;
            this.dataSource=new MatTableDataSource(this.usersList);
            this.dataSource._renderChangesSubscription;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            
          }
        )
      }else if(this.userconn.roles.name==ERole.ROLE_ENTREPRENEUR){
        this.us.getuserByentrepreneur(this.userconn.id).subscribe(
          res=>{
            console.log('sss',res)
            this.usersList=res;
            this.dataSource=new MatTableDataSource(this.usersList);
            this.dataSource._renderChangesSubscription;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            
          }
        )
      }else if(this.userconn.roles.name==ERole.ROLE_AGENT){
        this.us.getuserBagent(this.userconn.id).subscribe(
          res=>{
            this.usersList=res;
            this.dataSource=new MatTableDataSource(this.usersList);
            this.dataSource._renderChangesSubscription;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            
          }
        )
      }
    
    }
  )
  
}
supprimer(user :any){
  this.us.deleteuser(user.id).subscribe(()=>this.us.getusers().subscribe(
    data=>{
      this.usersList=data;
      this.dataSource = new MatTableDataSource(this.usersList);

    }
  )
  );
}
handleRowClick(rowData: any) {
  console.log('Row clicked:', rowData);
  // Call your function here
  this.myFunction(rowData);
}
myFunction(rowData:any) {
  console.log('Function called');
  // Do something here
  this.es.getEntrepriseByentrepreneur(rowData.id).subscribe(
    res=>{
      this.listofEntreprise=res;
      this.dataSourceentreprise=new MatTableDataSource(this.listofEntreprise);
      this.dataSourceentreprise._renderChangesSubscription;
      this.dataSourceentreprise.paginator = this.paginatorentreprise;
      this.dataSourceentreprise.sort = this.sortentreprise;
    }
  )
}
  /////////////////////////////////Entreprise////////////////:
  listofEntreprise:Entreprise[];
  displayedColumnsentreprise = ['entrpriseId','nom','numfisc', 'adresse','option'];
  dataSourceentreprise: MatTableDataSource<Entreprise>;
  @ViewChild(MatPaginator) paginatorentreprise: MatPaginator;
  @ViewChild(MatSort) sortentreprise: MatSort;
applyFilterentreprise(event: Event) {
  let filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSourceentreprise.filter = filterValue;
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
      this.listofMagasins=res;
      this.dataSourcemagasin=new MatTableDataSource(this.listofMagasins);
      this.dataSourcemagasin._renderChangesSubscription;
      this.dataSourcemagasin.paginator = this.paginatormagasin;
      this.dataSourcemagasin.sort = this.sortmagasin;
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
}
