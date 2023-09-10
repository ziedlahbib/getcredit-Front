import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Credit } from 'src/app/model/credit';
import { CreditServiceService } from 'src/app/service/credit-service.service';
import { DjangoService } from 'src/app/service/django.service';

@Component({
  selector: 'app-updatcredit',
  templateUrl: './updatcredit.component.html',
  styleUrls: ['./updatcredit.component.scss']
})
export class UpdatcreditComponent {
  public creidtform: FormGroup;
  public credit:Credit;
  card:any[];
  public isReady :boolean=false;
  selectedFiles: FileList;
  currentFile: any;
  constructor(private cs: CreditServiceService, private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute,private dj: DjangoService,) { }
    ngOnInit(): void {
      this.get(this.router.snapshot.params['id'])

    }
    creditform(data) {
      this.creidtform = this.formBuilder.group({
        montant: [data?.montant, Validators.required],
        nbrdumois: [data?.nbrdumois, Validators.required],
        iban:[data?.iban, Validators.required]
  
      });
      this.creidtform.valueChanges.subscribe(
        data => {
          console.log(this.creidtform.value);
  
        }
      )
    }
    get(id:number){
      this.cs.getCreditById(id ).subscribe(
        data => {
    
          this.credit = data;
          console.log(data);
          this.isReady=true
        this.creditform(data);
    
        }
      );
    }
    modifier(){
      this.cs.updateCredit(this.router.snapshot.params['id'],this.creidtform.value).subscribe(
        data=>{
          console.log(data);
          this.route.navigate(['/affichcredit']);
        }
      )
    }
    selectFile(event: any) {
      this.selectedFiles = event.target.files;
    }
    getcardinfo() {
      this.currentFile = this.selectedFiles.item(0);
      console.log(this.selectedFiles)
      console.log(this.currentFile)
      this.dj.upload(this.currentFile).subscribe(
        data => {
          console.log(data)
          this.card = data;
          
            this.creidtform.patchValue({
              iban: data[4]  // Assuming this.card contains the IBAN text
            });
          }
      );
          
  
    }
}
