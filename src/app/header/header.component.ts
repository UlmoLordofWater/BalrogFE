import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit{

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, public router: Router){}

  ngOnInit(): void {
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      }));
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
