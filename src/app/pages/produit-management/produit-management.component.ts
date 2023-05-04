import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Produit } from 'src/app/model/produit';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitServiceService } from 'src/app/service/produit-service.service';
import { Entreprise } from 'src/app/model/entreprise';
import { Magasin } from 'src/app/model/magasin';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/user';
import { MatSelectChange } from '@angular/material/select';
import { ERole } from 'src/app/model/erole';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-produit-management',
  templateUrl: './produit-management.component.html',
  styleUrls: ['./produit-management.component.scss']
})

export class ProduitManagementComponent {
  loading = false;
  loadingm=false;
  myControl = new FormControl();
  myControlmagasin = new FormControl();
  filteredOptionsmagasin: Observable<any[]>;
  filteredOptions: Observable<any[]>;
  matFormFieldHidePlaceholder: boolean = false;
  public magform: FormGroup;
  public entform: FormGroup;
  user: User;
  uisReaydu:boolean=false;
  public ERole=ERole ;
  listofMagasin: Magasin[] = [];
  listofEntreprise: Entreprise[]=[]
  public role: string | null;
  listofProduit:Produit[]=[]
  displayedColumns = ['produitId','nom','reference', 'prix','option'];
  dataSource: MatTableDataSource<Produit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ps:ProduitServiceService,private us: UserServiceService, private formBuilder: FormBuilder, private route: Router,
    private es: EntrepriseServiceService, private ms: MagasinServiceService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getrole();
    this.magasinform();
    this.entrepriseform();
    this.getentreprise();
    this.getproduitss()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptionsmagasin = this.myControlmagasin.valueChanges.pipe(
      startWith(''),
      map(value => this._filtermagasin(value))
    );
  }
  getproduitss(){;
    if(this.role!=ERole.ROLE_AGENT){
      this.getproduits()
    }else {
      let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{
        this.user=data;
        this.uisReaydu=true;
        console.log(this.user)
      this.ps.getProduitBymagasin(data.magasin.magasinId).subscribe(
        res=>{
          console.log(res)
          this.listofProduit=res;
          this.dataSource=new MatTableDataSource(this.listofProduit);
          this.dataSource._renderChangesSubscription;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        }
      )
      }
    )
      
    }
  }
  getuserbyid(){
    let token=localStorage.getItem('autorisation'|| '');
    let user:any=jwt_decode(token|| '');
    this.us.getuserById(user.jti).subscribe(
      data=>{
        console.log(data)
        this.user=data;
        this.uisReaydu=true;

      }
    )
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listofEntreprise.filter(option => option.nom.toLowerCase().includes(filterValue));
  }
  private _filtermagasin(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listofMagasin.filter(option => option.addresse.toLowerCase().includes(filterValue));
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
  getproduitsbymagasin(event: MatSelectChange){
    const value = event.value;
    //const value = this.entform.get(['entrpriseId'])?.value
    console.log(value)
    this.ps.getProduitBymagasin(Number(value)).subscribe(
      res => {
        console.log(res)
        this.listofProduit = res;
        this.dataSource=new MatTableDataSource(this.listofProduit);
        this.dataSource._renderChangesSubscription;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // Make changes to the component's data
        this.matFormFieldHidePlaceholder = false;

        // Manually trigger a change detection cycle
        this.cdr.detectChanges();
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
        if(data.roles.name==ERole.ROLE_ADMIN){
            this.es.getEntreprises().subscribe(
              res=>{
                this.listofEntreprise = res;
                this.verifierentreprise(res);
                
              }
            )
        }else if(data.roles.name==ERole.ROLE_ENTREPRENEUR){
          this.es.getEntrepriseByentrepreneur(data.id).subscribe(
            res => {
              this.listofEntreprise = res;
              this.verifierentreprise(res);
  
            }
          )
        }else if(data.roles.name==ERole.ROLE_AGENT){
          this.es.getEntrepriseByAgent(data.id).subscribe(
            res => {
              this.listofEntreprise.push(res);
              this.verifierentreprise(this.listofEntreprise);
  
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
        this.verifiermagasin(this.listofMagasin);

      }
    )
  }
  verifierentreprise(listE:Entreprise[])
  {
    if(  listE.length>0 ){
      this.loading=true;
      console.log('E',this.loading)
    }else if(listE.length==0){
      this.loading=false;
      console.log('E',this.loading)
    } 
  }
  verifiermagasin(listM:Magasin[])
  {
    if(  listM.length>0 ){
      this.loadingm=true;
      console.log('E',this.loading)
    }else if(listM.length==0){
      this.loadingm=false;
      console.log('E',this.loading)
    } 
  }
}
