import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from '@angular/core';
import { AuthService } from "./auth.service";

export const canActivate: CanActivateFn = (
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.getIsAuth() === false){
      router.navigate(['/home']);
    }
    return authService.getIsAuth()
  }
)




















// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree,  } from "@angular/router";
// import { AuthService } from "./auth.service";
// import { Observable } from "rxjs";
// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// @Injectable()
// export class AuthGuard implements CanActivateFn{

//   constructor(
//       private authService: AuthService,
//       private router: Router,
//     ){}

//     canActivate(
//       route: ActivatedRouteSnapshot,
//       state: RouterStateSnapshot
//       ): boolean | Observable<boolean | UrlTree>{
//         const isAuth = this.authService.getIsAuth();
//         if(!isAuth){
//           this.router.navigate(['/login']);
//         }
//         return isAuth;
//     }
// }
