import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'balrog';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthData();
  }

}
