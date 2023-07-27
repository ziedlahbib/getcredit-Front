import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Credit } from 'src/app/model/credit';
import { Produit } from 'src/app/model/produit';
import { User } from 'src/app/model/user';
import { CreditServiceService } from 'src/app/service/credit-service.service';
import { DjangoService } from 'src/app/service/django.service';
import { ProduitServiceService } from 'src/app/service/produit-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent implements OnInit {
  client:any[];
  client2:any[];
  isEligible:boolean=true
  selectedFiles: FileList ;
  currentFile: any;
  user:User;
  credit :Credit;
  produit:Produit;
  creidtform:FormGroup;
  clientform:FormGroup;
  clientform2:FormGroup;
  clienteleigibiliteform:FormGroup
  isDisabled:boolean=true;
  uisReaydu:boolean=false;
  uisReaydp:boolean=false;
  constructor(private _formBuilder: FormBuilder,private us:UserServiceService,private router:ActivatedRoute, private route :Router,
    private cs:CreditServiceService,private ps :ProduitServiceService,
    private dj:DjangoService) {}
  ngOnInit(): void {
    this.getuserbyid();
    this.getproduitbyid();
    this.clienteleigibiliteinitform()

  }
  initform(data) {
    this.clientform = this._formBuilder.group({
      nom: [data[5]],
      prenom: [data[10]],
      email: ['']
    });


    this.clientform.valueChanges.subscribe(data => {
      console.log(this.clientform.value);
    });
  }
  initform2(data) {
    const concatenatedString = `${data[7]}${data[8]}${data[9]}${data[10]}`;
    this.clientform2 = this._formBuilder.group({
      adresse: [concatenatedString],
    });


    this.clientform.valueChanges.subscribe(data => {
      console.log(this.clientform.value);
    });
  }
  agentform: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  creditform(){
    console.log(this.produit)
    console.log(this.uisReaydp)
    this. creidtform = this._formBuilder.group({
      montant: [ this.produit.prix ],
      nbrdumois:['']
  
  });
  this.creidtform.valueChanges.subscribe(
    data => {
      console.log(this.creidtform.value);

    }
  )
  }
  clienteleigibiliteinitform(){
    this. clienteleigibiliteform = this._formBuilder.group({
      age:[''],
      workclass:[''],
      education:[''],
      education_num:[''],
      marital_status:[''],
      occupation:[''],
      relationship:[''],
      race:[''],
      gender:[''],
      capital_gain:[''],
      capital_loss:[''],
      hours_per_week:[''],
      native_country:[''],
  
  });
  // Subscribe to the valueChanges of the form controls
  this.clienteleigibiliteform.valueChanges.subscribe((data) => {
    // Add space to the beginning of the values for selected controls
    const controlsWithSpace = ['workclass', 'education', 'marital_status', 'occupation', 'relationship','race','gender','native_country'];
    for (const controlName of controlsWithSpace) {
      const controlValue = this.clienteleigibiliteform.get(controlName)?.value;
      if (controlValue) {
        // Check if the value does not already start with a space
        if (!controlValue.startsWith(' ')) {
          // Add space at the beginning and update the form control
          this.clienteleigibiliteform.get(controlName)?.setValue(' ' + controlValue);
          // Trigger form control revalidation and update
          this.clienteleigibiliteform.get(controlName)?.updateValueAndValidity();
        }
      }
    }

    console.log(this.clienteleigibiliteform.value);
  });
  this.clienteleigibiliteform.valueChanges.subscribe(
    data => {
      console.log(this.clienteleigibiliteform.value);

    }
  )
  }
  checkEligibility(): void {
    this.dj.checkEligibility(this.clienteleigibiliteform.value).subscribe(
      (response) => {
        // Access the 'eligibilite' field and store it as a boolean variable
         this.isEligible = response.eligibilite;

        // Now you can use 'isEligible' in your application logic
        console.log('Is eligible:', this.isEligible);
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
  getuserinfo(){
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.selectedFiles)
    console.log(this.currentFile)
     this.dj.upload(this.currentFile).subscribe(
      data=>{
        console.log(data)
        this.client=data
        this.initform(data);
      }
    )
    
  }
  getuserinfo2(){
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.selectedFiles)
    console.log(this.currentFile)
     this.dj.upload(this.currentFile).subscribe(
      data=>{
        console.log(data)
        this.client2=data
        this.initform2(data);
      }
    )
    
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
  getproduitbyid(){
    this.ps.getProduitById(this.router.snapshot.params['id']).subscribe(
      data=>{
        console.log(this.router.snapshot.params['id'])
        this.produit=data;
        this.uisReaydp=true;
        this.creditform();

      }
    )
  }
  submit(){
    this.cs.ajoutCredit(this.creidtform.value).subscribe(
      data=>{
        this.credit=data;
        this.cs.affectecreditagent(data.creditId,this.user.id,data).subscribe(
          res=>{

          }
        )
        this.us.ajoutclient(this.clientform.value).subscribe(
          res=>{
            this.cs.affectecreditclient(data.creditId,res.id,data).subscribe(
              res=>{
    
              }
            )
          }
        )
        this.cs.affectecreditproduit(data.creditId,this.produit.produitId,data).subscribe(
          res=>{

          }
        )
        this.route.navigate(['/affichlistProduits'])
      }
    )
  }
}
