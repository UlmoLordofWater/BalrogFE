import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { resUserDto } from '../dto/resUser.dto';
import { AuthData } from '../dto/auth-data.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit{
  auth: AuthData;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.getUser().subscribe((info) => {
      this.auth = info;
      console.log(info);
      this.authService.refetchUser();
    })
  }

}
