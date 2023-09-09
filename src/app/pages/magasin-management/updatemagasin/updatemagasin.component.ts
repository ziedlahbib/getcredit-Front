import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Magasin } from 'src/app/model/magasin';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';

@Component({
  selector: 'app-updatemagasin',
  templateUrl: './updatemagasin.component.html',
  styleUrls: ['./updatemagasin.component.scss']
})
export class UpdatemagasinComponent {
  public magasinform: FormGroup;
  public magasin:Magasin;
  public isReady :boolean=false;
  constructor(private ms: MagasinServiceService, private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute) { }
    ngOnInit(): void {
      this.get(this.router.snapshot.params['id'])

    }
    initForm(data) {
      this.magasinform = this.formBuilder.group({
        addresse: [data.addresse, Validators.required],
      });
  
  
      this.magasinform.valueChanges.subscribe(
        data => {
          console.log(this.magasinform.value);
  
        }
      )
    }
    get(id:number){
      this.ms.getMagasinById(id ).subscribe(
        data => {
    
          this.magasin = data;
          console.log(data);
          this.isReady=true
        this.initForm(data);
    
        }
      );
    }
    modifier(){
      this.ms.updateMagasin(this.router.snapshot.params['id'],this.magasinform.value).subscribe(
        data=>{
          console.log(data);
          this.route.navigate(['/affichlistMagasins']);
        }
      )
    }
}
