import { Injectable } from "@angular/core";
import { Http,Response,RequestOptions,Headers  } from "@angular/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { map } from "rxjs/operator/map";
// import 'rxjs/add/operator/map'

@Injectable()
export class UserService{
    constructor(private http:Http,
                private authenticationService:AuthenticationService) {


    }
    getUsers():Observable<User[]>{
        let header=new Headers({'Authorization': 'Bearer' + this.authenticationService.token})
        let options=new RequestOptions({headers:header});
        return this.http.get('/api/users',options).map((response: Response) => response.json());
 
       
    }
}