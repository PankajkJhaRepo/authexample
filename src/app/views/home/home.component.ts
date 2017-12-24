import { Component,ElementRef,Output,EventEmitter } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { UserProfile } from "../../models/profile";
import { OAuthService } from "angular-oauth2-oidc";

@Component({
    moduleId:module.id,
    templateUrl:'home.component.html',
    styleUrls:['home.component.scss']
})
export class HomeComponent implements OnInit {
    user:User[]=[]
    profile:UserProfile={
        loginName:''
    };
    claims:any;

    @Output()
    applicationLoggedIn: EventEmitter<LoginEvent>;

    constructor(private userService:UserService,
                private oauthService:OAuthService,
                private element:ElementRef
    ) {
     
        
    }
    ngOnInit(){
        this.applicationLoggedIn=new EventEmitter<LoginEvent>();
        this.claims = this.oauthService.getIdentityClaims();
        this.profile.email=this.claims.email;
        this.profile.loginName=this.claims.name;
        this.profile.name=this.profile.loginName;
        this.profile.pictureUrl=this.claims.picture;

        this.userService.getUser(this.profile)
        .subscribe(usr=>{
            //this.profile=usr;
            this.applicationLoggedIn.emit({"profile":this.profile });
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
export class LoginEvent{
    profile:UserProfile
    }