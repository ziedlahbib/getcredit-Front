import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Magasin } from 'src/app/model/magasin';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';

@Component({
  selector: 'app-magasin-management',
  templateUrl: './magasin-management.component.html',
  styleUrls: ['./magasin-management.component.scss']
})
export class MagasinManagementComponent implements OnInit {

  listofMagasins:Magasin[];
  displayedColumns = ['magasinId','addresse','option'];
  dataSource: MatTableDataSource<Magasin>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ms:MagasinServiceService) { }
  ngOnInit(): void {
    this.getmagasins();
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
}
