import { Component } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    moduleId:module.id,
    templateUrl:'home.component.html'
})
export class HomeComponent implements OnInit {
    user:User[]=[]
    constructor(private userService:UserService) {
        
        
    }
    ngOnInit(){
        this.userService.getUsers()
        .subscribe(usrs=>{
            this.user=usrs;
        });
    }

}