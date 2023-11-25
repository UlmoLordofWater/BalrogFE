import { Injectable } from '@angular/core';
import { AuthData } from '../auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs";
import { resUserDto } from '../dto/resUser.dto';

const BACKEND_URL = "http://localhost:3000/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password};
    this.http.post(BACKEND_URL + "register", authData).subscribe(
      () => {
        this.router.navigate(["/login"]);
      }
    )
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log("login method", authData)
    return this.http.post<resUserDto>(
      BACKEND_URL + "auth/login", authData
      ).pipe(
        map((user) => {
          console.log(user.access_token);
          let token = JSON.stringify(user.access_token)
          let userId = JSON.stringify(user.id)
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
        })
      )
    }
}
