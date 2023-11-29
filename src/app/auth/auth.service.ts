import { Injectable } from '@angular/core';
import { AuthData } from '../dto/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, map } from "rxjs";
import { resUserDto } from '../dto/resUser.dto';

const BACKEND_URL = "http://localhost:3000/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string | null = null;
  private tokenTimer: NodeJS.Timer;
  private userId: string | null = null;
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router) {}

  getToken(){
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

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
          const token = user.access_token;
          if(token){
            const expiresInDuration = user.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = user.id;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate, this.userId);
          }
        })
      )
  }

  autoAuthData(){
      const authInfo = this.getAuthData();
      if(!authInfo) return;
      const now = new Date();
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if(expiresIn > 0){
        this.token = authInfo.token;
        this.isAuthenticated = true;
        this.userId = authInfo.userId;
        this.setAuthTimer(expiresIn / 1000)
        this.authStatusListener.next(true);
      }
  }

  logout(){
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.userId = null;
      this.removeAuthData();
      this.router.navigate(['/home'])
      // clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number){
    console.log("Setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string){
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('userId', userId);
  }

  private removeAuthData(){
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userId');
  }

  private getAuthData(){
      const token = localStorage.getItem('token');
      const expirationDate = localStorage.getItem('expiration');
      const userId = localStorage.getItem('userId');
      if(!token || !expirationDate) return;
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        userId: userId
      }
  }
}
