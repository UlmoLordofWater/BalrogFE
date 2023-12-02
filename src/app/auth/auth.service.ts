import { Injectable } from '@angular/core';
import { AuthData } from '../dto/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, map, timer } from "rxjs";
import { resUserDto } from '../dto/resUser.dto';

const BACKEND_URL = "http://localhost:3000/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  thisThing = [
    "userId",
    "jwt",
    "firstName",
    "lastName",
    "email",
    "city",
    "state",
    "zip",
  ];

  auth: AuthData;
  private isAuthenticated = false;
  private token: string | null = null;

  //fix at some point
  private tokenTimer: NodeJS.Timer;
  private userId: string | null = null;
  private authStatusListener = new Subject<boolean>();
  public authSubject: Subject<AuthData> = new Subject();

  constructor(private http: HttpClient, private router: Router, ) {}

  getToken(){
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  getUser(){
    return this.authSubject;
  }

  refetchUser() {
    this.authSubject.next(this.auth);
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
      if (this.auth == null) {
        let refresh = {};
        this.thisThing.forEach((these) => {
          // refresh = localStorage.getItem(these);
        });
        this.auth = <AuthData>(refresh);
      }
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
      this.thisThing.forEach((these) => {
        // localStorage.setItem(these, userId[these]);
      });
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
