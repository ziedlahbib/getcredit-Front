import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  usersList:User[]=[];
  usersListPagination?:User[];
  start=0;
  end=6;
  constructor(private us:UserServiceService) { }
  ngOnInit(): void {
    this.getuser();
  }

getuser() {

  return this.us.getusers().subscribe(
    data=>{
      this.usersList=data;
      this.usersListPagination=this.usersList.slice(this.start, this.end);
    }
  )
}
paginate(event:PageEvent) {
  let startIndex = event.pageSize * event.pageIndex;
  this.start = startIndex;
  let endIndex = startIndex + event.pageSize;
  this.end = endIndex;
  if (endIndex > this.usersList.length) {
    endIndex = this.usersList.length;
  }
  this.usersListPagination = this.usersList.slice(startIndex, endIndex);
}
/* 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue!=""){
      this.articleserveice.affichArticleparName(filterValue).subscribe(
        res=>{
          console.log(res)
            this.articles=res;
            this.articlePagination=this.articles.slice(this.start, this.end);
        }
      )
    }else{
      this.articleserveice.affichArticle().subscribe(
        data=>{
          this.articles=data;
          this.articlePagination=this.articles.slice(this.start, this.end);
        }
      )
    }


  }
*/
}
