import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { Component,Output,EventEmitter,Input } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { googleAuthConfig } from "../../app-config/google-auth/google-auth.config";

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
    model:any={}
    loading=false
    error=''
    @Input() isLoggedIn:boolean;
    @Input() loginImage:string;
    constructor(private router:Router,
                private authenticationService:AuthenticationService,
                private oauthService:OAuthService
            ) {
    }
    ngOnInit(){
        //this.oauthService.logOut(true);
        // this.oauthService.events.subscribe(e => {
        //     //this.isLoggedIn=true;
        //     console.log("oauthService event " + e);
        // });
        // this.oauthService.events.filter(e => e.type === 'token_received').subscribe(e => {

        // });
    }
    logout(){
      this.loading=true;
       this.oauthService.logOut(false);
       this.router.navigate(['/appinfo']);
       this.loading=false;
    }
    login(){
        this.loading=true;
        this.oauthService.initImplicitFlow('some-state');
        // this.oauthService.events.filter(e => e.type === 'token_received').subscribe(e => {
        //     this.isLoggedIn=true;
        //     console.log("token_received " + this.isLoggedIn);
        // });
        // console.log('login')
        
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
