import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private api:ApiService, private router:Router){

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.api.user) {
      return true;
    }else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
}
