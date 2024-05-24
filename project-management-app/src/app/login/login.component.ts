import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityServiceService } from '../services/security-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginForm     : FormGroup;

  constructor(
    private formBuilder             : FormBuilder,
    private securityService         : SecurityServiceService,
    private router                  : Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  async submitLoginForm(){
    if (this.loginForm.valid) {
      await this.securityService.login(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value);
      this.router.navigateByUrl('/');

      this.loginForm.reset({
        username: null,
        password: null
      });    
    } else {
      console.log('Form is not valid');
    }
  }
}
