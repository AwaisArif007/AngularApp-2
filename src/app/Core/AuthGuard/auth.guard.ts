import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authService: any;
  router: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
      return this.authService.isLoggedIn        
      .pipe(take(1),                             
        map((isLoggedIn: boolean) => {         
          if (!isLoggedIn){
            this.router.navigate(['/adminlogin']); 
            return false;
          }
          return true;
        })
      )
  }
  
}
function take(arg0: number): any {
  throw new Error('Function not implemented.');
}

