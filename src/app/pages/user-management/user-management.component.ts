import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwt_decode from "jwt-decode";
import { Role } from 'src/app/model/role';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  usersList:User[]=[];
  displayedColumns = ['id','username','nom', 'prenom','adresse','tel','email','option'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private us:UserServiceService) { }
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

 this.us.getusers().subscribe(
    data=>{
      this.usersList=data;
      this.dataSource=new MatTableDataSource(this.usersList);
      this.dataSource._renderChangesSubscription;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
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

}
