import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginComponent } from './core/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './features/components/profile/profile.component';
import { AngularMaterialModule } from './angular-material.module';
import { HomeComponent } from './core/components/home/home.component';
import { ErrorComponent } from './error/error.component';
import { PostsComponent } from './features/components/posts/posts.component';
import { TodoComponent } from './features/components/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    ErrorComponent,
    PostsComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
