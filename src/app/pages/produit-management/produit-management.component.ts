import { Component, ViewChild } from '@angular/core';
import { Produit } from 'src/app/model/produit';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitServiceService } from 'src/app/service/produit-service.service';

@Component({
  selector: 'app-produit-management',
  templateUrl: './produit-management.component.html',
  styleUrls: ['./produit-management.component.scss']
})

export class ProduitManagementComponent {
  listofProduit:Produit[];
  displayedColumns = ['produitId','nom','reference', 'prix','option'];
  dataSource: MatTableDataSource<Produit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ps:ProduitServiceService) { }
  ngOnInit(): void {
    this.getproduits();
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitpspace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matchps
    this.dataSource.filter = filterValue;
  }
  getproduits(){
    this.ps.getProduits().subscribe(
      data=>{
        this.listofProduit=data;
        this.dataSource=new MatTableDataSource(this.listofProduit);
        this.dataSource._renderChangesSubscription;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  supprimer(entreprise :any){
    this.ps.deleteProduit(entreprise.entrpriseId).subscribe(()=>this.ps.getProduits().subscribe(
      data=>{
        this.listofProduit=data
        this.dataSource = new MatTableDataSource(this.listofProduit);
      }
    )
    );
  }
}
