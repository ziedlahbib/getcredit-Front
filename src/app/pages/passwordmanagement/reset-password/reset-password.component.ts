import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  message: String;
  invalidpw = false;
  Successpw = false
  public pwform: FormGroup;
  constructor(private us: UserServiceService, private formBuilder: FormBuilder, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  initForm() {
    this.pwform = this.formBuilder.group({
      newpassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],

    },
      {
        validator: this.ConfirmedValidator('newpassword', 'confirmPassword')
      });
    this.pwform.valueChanges.subscribe(
      data => {
        console.log(this.pwform.value)
      }

    )
  }
  update() {
    const controlName = 'newpassword';
    const controlValue = this.pwform.controls[controlName].value;
    this.router.queryParams.subscribe(
      data => {
        console.log(data)
        //this.value = data.filterValue
        this.us.resettpassword(controlValue,data?.['token']).subscribe(
          data => {
            this.message = data;
            console.log(data);
            this.route.navigate(['/login'])
          }
        )
      }


    )
  }
}
