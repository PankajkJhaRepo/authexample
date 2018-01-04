import { Component,OnInit } from "@angular/core";
import { AppImages } from "../../models/app-images";
import { UserImageService } from "../../services/user-images.service";
import { OAuthService } from "angular-oauth2-oidc";
import { UserService } from "../../services/user.service";
import { UserProfile } from "../../models/profile";
@Component({
    selector:"user-image",
    templateUrl:'user-images.component.html',
    styleUrls:['user-images.scss']
})
export class UserImagesComponent implements OnInit {
    allImages:AppImages[]
    claim:any;
    profile:UserProfile=new UserProfile();
    constructor(private userimageService:UserImageService,
        private oauthService:OAuthService,
        private userService:UserService ) {
        
    }
    ngOnInit(){
        this.claim = this.oauthService.getIdentityClaims();
        this.profile.email=this.claim.email;
        this.userimageService.getAllApplicationImages(this.claim.email).subscribe(res=>{
             this.allImages=res;
        })
        this.userService.getUser(this.profile)
        .subscribe(usr=>{
            this.profile=usr;
        });
    }
    SetAsProfile(imageModel){
        this.profile.pictureUrl=imageModel.url;
        this.userService.saveUser(this.profile).subscribe(res=>{
            console.log(res);
        })
    }

}