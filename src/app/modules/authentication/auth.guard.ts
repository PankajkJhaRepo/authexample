
import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router:Router,
        private oauthService:OAuthService
    ) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
       var token= this.oauthService.getAccessToken()
       if(token){
        //if(sessionStorage.getItem('currentUser')){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }


    
    
    
}