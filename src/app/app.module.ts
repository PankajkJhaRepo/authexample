import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './modules/authentication/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { BaseRequestOptions } from '@angular/http';
import { UserService } from './services/user.service';
//import { fakeBackendProvider } from './helpers/fake-backend';
//import { MockBackend } from '@angular/http/testing';

import { OAuthService, JwksValidationHandler,OAuthModule  } from 'angular-oauth2-oidc';
import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { UrlHelperService } from 'angular-oauth2-oidc';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { FileService } from './component/file-upload/file.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    HttpClientModule ,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    //fakeBackendProvider,
    //MockBackend,
    BaseRequestOptions,
    OAuthService,
    HttpClient,
    UrlHelperService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
