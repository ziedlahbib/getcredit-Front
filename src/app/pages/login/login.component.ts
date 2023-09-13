import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  value: any;
  public loginForm!: FormGroup;
  
  public username?: string;
  public password? : string;

  errorMessage = "Les informations d'identification invalides";
  errordesaMessage = "Ce compte est désactivé";
  successMessage?: string;
  comptedesa=false;
  invalidLogin = false;
  loginSuccess = false
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthServiceService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = new FormGroup(
      {
        username : new FormControl(),
        password : new FormControl()
      }
    )
  }
  handleLogin() {
    this.authenticationService.authenticationService(this.loginForm.value).subscribe(
      (result) => {
        console.log(result);
        console.log(result.message);
        if (result.message === "Ce compte est désactivé") {
          this.authenticationService.logout();
          this.comptedesa=true
        } else {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          this.router.navigate(['/affichlistuser']);
          this.authenticationService.registerSuccessfulLogin(result);
        }
      },
      () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      }
    );
  }
  
}
