import { Component,ElementRef } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { UserProfile } from "../../models/profile";
import { OAuthService } from "angular-oauth2-oidc";

@Component({
    moduleId:module.id,
    templateUrl:'home.component.html'
})
export class HomeComponent implements OnInit {
    user:User[]=[]
    profile:UserProfile={
        loginName:''
    };
    claims:any;
    constructor(private userService:UserService,
                private oauthService:OAuthService,
                private element:ElementRef
    ) {
     
        
    }
    ngOnInit(){
        this.claims = this.oauthService.getIdentityClaims();
        this.profile.email=this.claims.email;
        this.profile.loginName=this.claims.name;
        this.profile.name=this.profile.loginName;
        this.profile.pictureUrl=this.claims.picture;

        this.userService.getUser(this.profile)
        .subscribe(usr=>{
            //this.profile=usr;
        });
    }
    onChange(event) {
        console.log('onChange');
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = function(e) {
            //var src = e.target;
           // image.src = src;
            image.src=reader.result
        };

        reader.readAsDataURL(event.target.files[0]);
        
      }

}