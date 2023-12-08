import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { ProfileComponent } from './features/components/profile/profile.component';
import { HomeComponent } from './core/components/home/home.component';
import { canActivate } from './core/guards/auth.guard';
import { PostsComponent } from './features/components/posts/post-list/posts.component';
import { TodoComponent } from './features/components/todo/todo-list/todo.component';
import { TodoCreateComponent } from './features/components/todo/todo-create/todo-create.component';
import { PostCreateComponent } from './features/components/posts/post-create/post-create.component';

const routes: Routes = [
  { path: "", component: SignUpComponent},
  { path: "auth/login", component: LoginComponent},
  { path: "home", component: HomeComponent},
  { path: "posts", component: PostsComponent},
  { path: "todos", component: TodoComponent},
  { path: "create/todo", component: TodoCreateComponent},
  { path: "create/post", component: PostCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter([
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [canActivate],
    },
  ])]
})
export class AppRoutingModule { }
