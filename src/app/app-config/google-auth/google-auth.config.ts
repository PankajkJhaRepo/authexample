import { AuthConfig } from "angular-oauth2-oidc";

export const googleAuthConfig:AuthConfig = {
    //issuer : 'accounts.google.com',
//    issuer : 'https://accounts.google.com',
//     redirectUri : window.location.origin ,
//     clientId:'101297816857-8b78qb6gb75k12gqlehah91h3ufmb0ho.apps.googleusercontent.com',
//     scope : 'openid email profile',
//     loginUrl : 'https://accounts.google.com/o/oauth2/v2/auth',
//     tokenEndpoint : 'https://www.googleapis.com/oauth2/v4/token',
//     userinfoEndpoint:'https://www.googleapis.com/oauth2/v3/userinfo',
//     oidc : true,
//     strictDiscoveryDocumentValidation:false,
//     requireHttps:false,
//     dummyClientSecret:'sO_YC4lYAyBUiJIU48vW7wnr'

// Url of the Identity Provider
issuer: 'https://accounts.google.com',

  // URL of the SPA to redirect the user to after login
  //redirectUri: window.location.origin + '/index.html',
  redirectUri: window.location.origin + '/index.html',

  

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '',

  strictDiscoveryDocumentValidation: false,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

  
  showDebugInformation: false,

  sessionChecksEnabled: true}

