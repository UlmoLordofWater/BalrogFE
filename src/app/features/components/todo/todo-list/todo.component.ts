import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthData } from 'src/app/core/dto/auth-data.model';
import { resTodoData } from 'src/app/core/dto/resTodo.dto';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  todos: resTodoData[] = [];
  todo: resTodoData;
  auth: AuthData;
  userAuthorized = false;
  private authListenerSubs: Subscription;

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ){}

  getTodos(): void{
      this.todoService.getTodos()
        .subscribe(info => (this.todos = info, console.log(info)));
  }

  ngOnInit() {
    this.authService.getUser().subscribe((u) => {
      this.auth = u;
      this.userAuthorized = u != null;
    });
    this.authService.refetchUser();

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthorized => {
      this.userAuthorized = isAuthorized;
    }));
    this.getTodos();
  }

}
