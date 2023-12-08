import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.sass']
})
export class TodoCreateComponent {

  constructor(
    private todoService: TodoService,
    private router: Router
  ){}

  onTodoCreate(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value.title, "line 22");
    this.todoService.createTodo(form.value.todo).subscribe(
      () => {
        this.router.navigate(["/todos"]);
      });
  }

}
