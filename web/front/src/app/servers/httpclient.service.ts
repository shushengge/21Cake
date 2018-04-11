import { Injectable } from '@angular/core';
import {Http, RequestMethod, RequestOptions} from '@angular/http';

@Injectable()
export class HttpclientService {
    baseurl: string = "http://10.3.136.37:8080/";
    constructor(private http: Http) { }
    
    filterurl(url){
        if(url.startsWith('http')){
            return url;
        }
        return this.baseurl + url;
    }

    get(url: string, params?: {}){
        return new Promise((reslove, reject) => {
            params = params || {};
            params["_"] = Math.random();
            this.http.request(this.filterurl(url), new RequestOptions({
                method: RequestMethod.Get,
                search: params
            })).toPromise().then((res) => {
                reslove(res.json());
            }).catch((error) => {
                reject(error);
            })
        })
    }
}
