import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isUserLoggedIn : boolean;
    let existingUserDetails = localStorage.getItem('USER');
    if (existingUserDetails) {
      isUserLoggedIn = true;
    } else {
      this.router.navigateByUrl('/');
      isUserLoggedIn = false;
    }
    return isUserLoggedIn;
  }
  
}
