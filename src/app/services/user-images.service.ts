import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AppImages } from "../models/app-images";
import { RequestOptions, Http,Headers,Response } from "@angular/http";
import { AuthenticationService } from "./authentication.service";
import { strictEqual } from "assert";

@Injectable()
export class UserImageService{
    baseURL:string= 'http://personalnformationservice.azurewebsites.net' 
//    'http://localhost:18611'
    constructor(private http:Http,
        private authenticationService:AuthenticationService) {
        
        
    }
    getAllApplicationImages(userId:string):Observable<AppImages[]>{
         let header= new Headers({'Authorization': 'Bearer' + this.authenticationService.token})
        // let options=new RequestOptions({headers:header});
        // var parameters = {
        //     userId: userId,
        // }; 
        // options.params=parameters;
        //,body:{PartitionKey:'GMAIL',RowKey:profile.email}
        var data = {
            userId: userId,
           };
           
           var config = new RequestOptions( {
            params: data,
            headers : header
           });
        return this.http.get(this.baseURL + '/api/Image'  ,config).map((response: Response) => {
        let images:AppImages[]= [];
        let imgList:any= response.json();
        if(imgList && imgList.Images.length > 0){
            for(var img of imgList.Images){
                images.push({name: img.Name,size:img.Size,url:img.Url,personId:img.PersonId,persistedFaceId:img.persistedFaceId })
            }
        }
        return images;
        }
        );

    }
    Delete(image:AppImages){
        
        let header=new Headers({'Authorization': 'Bearer' + this.authenticationService.token})
        header.append('Content-Type','application/json');
        //{ 'Content-Type': 'application/json' }
        let imageDTO:any={};
        imageDTO.Name=image.name;
        imageDTO.Size=image.size;
        imageDTO.Created=null;
        imageDTO.Modified=null;

        imageDTO.Url=image.url;
        imageDTO.PersonId=image.personId;
        imageDTO.persistedFaceId=image.persistedFaceId;
        
        //let options=new RequestOptions({headers:header});
        
        var data = {
            image: imageDTO,
           };
           
           var config = new RequestOptions( {
            body:imageDTO,
            params: data,
            headers : header
           });

        return this.http.delete(this.baseURL + '/api/Image',config).map((response:Response)=> response.json());
      //let options=new RequestOptions({headers:header});
      //return this.http.post(this.baseURL + '/api/Image/delete',imageDTO,options).map((response:Response)=> response.json());

    }
}