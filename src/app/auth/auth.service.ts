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

  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password};
    return this.http.post(BACKEND_URL + "register", authData);
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log("login method", authData)
    return this.http.post<resUserDto>(
      BACKEND_URL + "auth/login", authData
      ).pipe(
        map((user) => {
          let token = JSON.stringify(user.access_token);
          let userId = JSON.stringify(user.id);
          this.saveAuthData(token, userId)
        })
      )
  }

  // autoAuthData(){
  //       const authInfo = this.getAuthData();
  //       if(!authInfo) return;
  // }

  logout(){
    this.removeAuthData();
  }

  private saveAuthData(token: string, userId: string){
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
  }

  private removeAuthData(){
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
  }



  private getAuthData(){
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if(!token) return;
      return {
        token: token,
        userId: userId
      }
  }
}
