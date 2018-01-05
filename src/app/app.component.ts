import { Component,AfterViewInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { googleAuthConfig } from './app-config/google-auth/google-auth.config';
import { UserProfile } from './models/profile';
import { UserService } from './services/user.service';



@Component({
  moduleId:module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'IOT information app';
  isVisible=false;
  isLoggedIn:boolean=false;
  loggedinImage:string='';
  claim:any={};
  profile:UserProfile=new UserProfile();
  navLinks=[
    {
      path:'/',
      label:'User Profile',
      isActive:true
    },
    {
      path:'images',
      label:'Images',
      isActive:false
    }
  ]


  // constructor(private oauthService: OAuthService) {
  //   this.oauthService.loginUrl = 'https://accounts.google.com/o/oauth2/auth';
  //   this.oauthService.tokenEndpoint = 'https://accounts.google.com/o/oauth2/token';
  //   this.oauthService.redirectUri = window.location.origin ;
  //   this.oauthService.clientId = '';
  //   this.oauthService.scope = 'openid email profile';
    
  //   this.oauthService.oidc = true;
  //   this.oauthService.setStorage(sessionStorage);
  //   this.oauthService.issuer = 'accounts.google.com';
  //   this.oauthService.tryLogin();
    
  // }


  constructor(private oauthService: OAuthService,
    private userService:UserService
              ) {
    
    this.configureWithNewConfigApi();
 }
 ngAfterViewInit(){
  this.initializeApp();
 }
  // This api will come in the next version
  private configureWithNewConfigApi() {
    
          this.oauthService.configure(googleAuthConfig);
          this.oauthService.tokenValidationHandler = new JwksValidationHandler();
          this.oauthService.loadDiscoveryDocumentAndTryLogin();
          
          // Optional
          this.oauthService.setupAutomaticSilentRefresh();

          // this.oauthService.events.subscribe(e => {
          //   console.debug('oauth/oidc event', e);
          // });
          
        

          this.oauthService.events.filter(e => e.type === 'logout').subscribe(e => {
            this.isLoggedIn=false;
            this.claim={};
           // console.debug('Your session has been terminated!');
          });
          
          this.oauthService.events.filter(e => e.type === 'token_received').subscribe(e => {
            this.initializeApp();
           // console.log('token_received');
            // this.oauthService.loadUserProfile().then(res=>{
            //     console.log('profile loaded');
            //    console.log(res);
            //  })
          });
    
        }

        initializeApp(){
          
          this.claim = this.oauthService.getIdentityClaims();
          if(this.claim){
            this.isLoggedIn=true;
            this.loggedinImage= this.claim.picture;
            this.profile.email=this.claim.email;
            this.userService.getUser(this.profile)
            .subscribe(usr=>{
                this.profile=usr;
                this.loggedinImage=this.profile.pictureUrl;
            });
          }
          
        }
        
    
  
}

