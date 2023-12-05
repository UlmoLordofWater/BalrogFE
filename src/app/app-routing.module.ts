import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { ProfileComponent } from './features/components/profile/profile.component';
import { HomeComponent } from './core/components/home/home.component';
import {canActivate } from './core/guards/auth.guard';
import { PostsComponent } from './features/components/posts/posts.component';
import { TodoComponent } from './features/components/todo/todo.component';

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
