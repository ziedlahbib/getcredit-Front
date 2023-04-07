import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';

@Component({
  selector: 'app-add-magasin',
  templateUrl: './add-magasin.component.html',
  styleUrls: ['./add-magasin.component.scss']
})
export class AddMagasinComponent implements OnInit {
  public magasinform: FormGroup;
  constructor(private ms: MagasinServiceService, private formBuilder: FormBuilder, private route: Router) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.magasinform = this.formBuilder.group({
      addresse: ['', Validators.required],
    });


    this.magasinform.valueChanges.subscribe(
      data => {
        console.log(this.magasinform.value);

      }
    )
  }
  ajouter() {
    this.ms.ajoutMagasin(this.magasinform.value).subscribe(
      data => {
        console.log(data);
        this.route.navigate(['/affichlistMagasins']);
      }
    )
  }
}
