import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {canActivate } from './auth/auth.guard';
import { PostsComponent } from './posts/posts.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: "", component: SignUpComponent},
  { path: "auth/login", component: LoginComponent},
  { path: "home", component: HomeComponent},
  { path: "create/post", component: PostsComponent},
  { path: "create/todo", component: TodoComponent},
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
