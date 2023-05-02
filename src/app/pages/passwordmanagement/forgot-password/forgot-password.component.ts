import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public form!: FormGroup;
  message:string;
  mr:boolean=false;
  constructor(private formBuilder: FormBuilder,private router:Router,private us :UserServiceService) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({

      email: ['', [Validators.required,Validators.email]],

    });
    this.form.valueChanges.subscribe(
      data => {
        console.log(this.form?.value);
        
      }
    )
    }
    send(){
      const controlName = 'email';
const controlValue = this.form.controls[controlName].value;

      this.us.forgotPassword(controlValue).subscribe(
        data=>{
          this.message=data;
          this.router.navigate(['/login'])
          this.mr=true;
        }
      )
    }
}
