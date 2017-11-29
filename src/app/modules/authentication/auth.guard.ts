
import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router:Router) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(sessionStorage.getItem('currentUser')){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }


    
    
    
}