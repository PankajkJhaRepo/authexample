import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { googleAuthConfig } from "../../app-config/google-auth/google-auth.config";
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
    model:any={}
    loading=false
    error=''
    constructor(private router:Router,
                private authenticationService:AuthenticationService,
                private oauthService:OAuthService
            ) {
    }
    ngOnInit(){
       
    }
    login(){
        this.loading=true;
        this.oauthService.initImplicitFlow('some-state');
        
        
        // this.authenticationService.login(this.model.username,this.model.password)
        // .subscribe(result=> {
        //     if(result==true)
        //         this.router.navigate(['/'])
        //         else{
        //             this.error="Username or password incorrect"
        //             this.loading=false;
        //         }
        // })
    }
}