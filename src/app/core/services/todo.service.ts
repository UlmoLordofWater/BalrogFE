import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { TodoData } from '../dto/todo.dto';
import { resTodoData } from '../dto/resTodo.dto';

const BACKEND_URL = "http://localhost:3000/todo"

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoUpdated = new Subject<resTodoData[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createTodo(title: string){
    const todoData: TodoData = {title: title};
    console.log("create todo", todoData);
    return this.http.post(BACKEND_URL + "/create", todoData);
  }

  getTodos(): Observable<resTodoData[]>{
    return this.http.get<resTodoData[]>(BACKEND_URL)
    .pipe(map(todoData => {
      todoData = todoData.map((data) => {
        return data;
      })
      return todoData;
    }
    ))
  }

  getPostUpdateListener() {
    return this.todoUpdated.asObservable();
  }
}
