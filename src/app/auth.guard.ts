import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private user: UserService,private router: Router) {}

  canActivate() {

    if(!this.user.isLoggedIn())
    {
       this.router.navigate(['/login']);
       return false;
    }

    return true;
  }
}