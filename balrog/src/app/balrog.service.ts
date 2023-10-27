import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalrogService {

    url = "http://localhost:4200/";

    constructor(private http:HttpClient) {};

    createUser(email: string, password: string){
      return this.http.post(this.url + '/signup', {email, password});
    }

}
