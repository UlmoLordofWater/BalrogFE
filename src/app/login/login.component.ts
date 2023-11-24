import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(
      private authService: AuthService,
    ) {}

  onLogin(form: NgForm){
    const val = form.value;
    console.log("got info from form", form)
    if(form.invalid){
      return;
    }
    console.log("sending to login", val.email, val.password)
    this.authService.login(val.email, val.password);
  }
}
