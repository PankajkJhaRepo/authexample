import { Component,OnInit } from "@angular/core";
import { AppImages } from "../../models/app-images";
import { UserImageService } from "../../services/user-images.service";
import { OAuthService } from "angular-oauth2-oidc";
@Component({
    selector:"user-image",
    templateUrl:'user-images.component.html',
    styleUrls:['user-images.scss']
})
export class UserImagesComponent implements OnInit {
    allImages:AppImages[]
    claim:any;
    constructor(private userimageService:UserImageService,
        private oauthService:OAuthService ) {
        
    }
    ngOnInit(){
        this.claim = this.oauthService.getIdentityClaims();

        this.userimageService.getAllApplicationImages(this.claim.email).subscribe(res=>{
             this.allImages=res;
        })
    }

}