import { Injectable } from "@angular/core";
import { Http,Response,RequestOptions,Headers  } from "@angular/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { map } from "rxjs/operator/map";
import { UserProfile } from "../models/profile";
import { forEach } from "@angular/router/src/utils/collection";

// import 'rxjs/add/operator/map'

@Injectable()
export class UserService{
    baseURL:string='http://localhost:18611'
    constructor(private http:Http,
                private authenticationService:AuthenticationService) {


    }
    getUser(profile:UserProfile):Observable<UserProfile>{
        let header= new Headers({'Authorization': 'Bearer' + this.authenticationService.token})
        let options=new RequestOptions({headers:header});
        //,body:{PartitionKey:'GMAIL',RowKey:profile.email}
        return this.http.get(this.baseURL + '/api/information/GetEntities/GMAIL/'+ profile.email + '/',options).map((response: Response) => {
        let usr:UserProfile;
        let userList:any[]= response.json();
        if(userList && userList.length > 0){
            usr=new UserProfile();
            usr.email=userList[0].email;
            usr.employeeID=userList[0].employeeID;
            usr.id=userList[0].id;
            usr.loginName=userList[0].loginName;
            usr.name=userList[0].name;
            usr.pictureUrl=userList[0].pictureUrl;
            
        }
        return usr;
        }
        );
        //return this.http.post(this.baseURL + '/api/information/GetEntities',options).map((response: Response) => response.json());
    }
    saveUser(profile:UserProfile):Observable<boolean>{
        let header=new Headers({'Authorization': 'Bearer' + this.authenticationService.token})
        header.append('Content-Type','application/json');
        //{ 'Content-Type': 'application/json' }
        let req:any={};
        req.userdto=profile;
        let options=new RequestOptions({headers:header});
        return this.http.post(this.baseURL + '/api/information',profile,options).map((response:Response)=> response.json());
       //return true;
    }

    saveProfileImage(event):Observable<any>{
        const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        const files: FileList = target.files;
        const formData: FormData = new FormData();
        
          for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
          }
       // input.append()
        //let result:string='';
        let header=new Headers({'Authorization': 'Bearer' + this.authenticationService.token})
        let options=new RequestOptions({headers:header,body:formData});
        return this.http.post(this.baseURL + '/api/image',options).map((response: Response) => response.json());
       // options.
       // this.http.post('/api/image',options).map((response: Response) => response.json());
       // return result;
    }
    
}