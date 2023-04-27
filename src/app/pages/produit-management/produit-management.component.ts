import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Produit } from 'src/app/model/produit';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitServiceService } from 'src/app/service/produit-service.service';
import { Entreprise } from 'src/app/model/entreprise';
import { Magasin } from 'src/app/model/magasin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/user';
import { MatSelectChange } from '@angular/material/select';
import { ERole } from 'src/app/model/erole';

@Component({
  selector: 'app-produit-management',
  templateUrl: './produit-management.component.html',
  styleUrls: ['./produit-management.component.scss']
})

export class ProduitManagementComponent {
  matFormFieldHidePlaceholder: boolean = false;
  public magform: FormGroup;
  public entform: FormGroup;
  user: User;
  public ERole=ERole ;
  listofMagasin: Magasin[] = [];
  listofEntreprise: Entreprise[]
  public role: string | null;
  listofProduit:Produit[]=[]
  displayedColumns = ['produitId','nom','reference', 'prix','option'];
  dataSource: MatTableDataSource<Produit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ps:ProduitServiceService,private us: UserServiceService, private formBuilder: FormBuilder, private route: Router,
    private es: EntrepriseServiceService, private ms: MagasinServiceService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.magasinform();
    this.entrepriseform();
    this.getproduits();
    this.getentreprise();
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
  magasinform() {
    this.magform = this.formBuilder.group({
      magasinId: ['', Validators.required],
    });


    this.magform.valueChanges.subscribe(
      data => {
        console.log(this.magform.value);

      }
    )
  }
  entrepriseform() {
    this.entform = this.formBuilder.group({
      entrpriseId: ['', Validators.required],
    });


    this.entform.valueChanges.subscribe(
      data => {
        console.log(this.entform.value);

      }
    )
  }
  getrole() {
    this.role = localStorage.getItem('role' || '');
    console.log(this.role)
  }
  getentreprise() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwt_decode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {
        if(data.roles.name=ERole.ROLE_ADMIN){
            this.es.getEntreprises().subscribe(
              res=>{
                this.listofEntreprise = res;
              }
            )
        }else if(data.roles.name=ERole.ROLE_ENTREPRENEUR){
          this.es.getEntrepriseByentrepreneur(data.id).subscribe(
            res => {
              this.listofEntreprise = res;
  
            }
          )
        }

      }
    )
  }
  getmagasins(event: MatSelectChange) {
    const value = event.value;
    //const value = this.entform.get(['entrpriseId'])?.value
    console.log(value)
    this.ms.getmagasinsbyentreprise(Number(value)).subscribe(
      res => {
        console.log(res)
        this.listofMagasin = res;
        // Make changes to the component's data
        this.matFormFieldHidePlaceholder = false;

        // Manually trigger a change detection cycle
        this.cdr.detectChanges();
      }
    )
  }
}
