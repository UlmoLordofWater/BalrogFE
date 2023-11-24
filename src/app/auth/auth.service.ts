import { Injectable } from '@angular/core';
import { AuthData } from '../auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs";

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
    this.http.post<{email: string, password: string}>(
      BACKEND_URL + "auth/login", authData
      ).pipe(
        map((user) => {
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
          return user;
        })
      )
    }
}
