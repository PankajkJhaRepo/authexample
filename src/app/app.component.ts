import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';


@Component({
  moduleId:module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';


  constructor(private oauthService: OAuthService) {
    this.oauthService.loginUrl = 'https://accounts.google.com/o/oauth2/auth';
    this.oauthService.tokenEndpoint = 'https://accounts.google.com/o/oauth2/token';
    this.oauthService.redirectUri = window.location.origin ;
    this.oauthService.clientId = '';
    this.oauthService.scope = 'openid email profile';
    
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.issuer = 'accounts.google.com';
    this.oauthService.tryLogin();
    
  }
//   constructor(private oauthService: OAuthService) {
//     // this.oauthService.loginUrl = "https://localhost:44301/identity/connect/authorize"; //Id-Provider?
//     // this.oauthService.redirectUri = window.location.origin + "/index.html";
//     // this.oauthService.clientId = "spa-demo";
//     // this.oauthService.scope = "openid profile email voucher";
//     // //this.oauthService.issuer = "https://localhost:44301/identity";
//     // this.oauthService.issuer = "https://www.portal.azure.com";
//     // this.oauthService.oidc = true;  
    
//     // this.oauthService.tryLogin({}); // Parst Token aus der Url
    
//     // URL of the SPA to redirect the user to after login
//     this.oauthService.redirectUri = window.location.origin + "/index.html";
    
//         // The SPA's id. The SPA is registerd with this id at the auth-server
//         //this.oauthService.clientId = "spa-demo";
//         this.oauthService.clientId="101297816857-8b78qb6gb75k12gqlehah91h3ufmb0ho.apps.googleusercontent.com"
        
//         // set the scope for the permissions the client should request
//         // The first three are defined by OIDC. The 4th is a usecase-specific one
//         this.oauthService.scope = "openid profile email voucher";
    
//         // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
//         // OAuth2-based access_token
//         this.oauthService.oidc = true; // ID_Token
    
//         // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
//         // instead of localStorage
//         this.oauthService.setStorage(sessionStorage);
    
//         // Discovery Document of your AuthServer as defined by OIDC
//       //  let url = 'https://steyer-identity-server.azurewebsites.net/identity/.well-known/openid-configuration';
//    // let url='https://steyer-identity-server.azurewebsites.net/identity'
//    let url='https://accounts.google.com'
//         // Load Discovery Document and then try to login the user
//         this.oauthService.loadDiscoveryDocument(url).then(() => {
    
//           // This method just tries to parse the token(s) within the url when
//           // the auth-server redirects the user back to the web-app
//           // It dosn't send the user the the login page
//           this.oauthService.tryLogin({});
//   });
// }
}
