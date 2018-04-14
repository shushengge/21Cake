import { Injectable } from '@angular/core';
import {Http, Headers,RequestMethod,RequestOptions,URLSearchParams} from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class HttpclientService {
    baseurl: string = "http://localhost:8080/";

    constructor(private http : Http, private router: Router) { }

    filterUrl(url){
        return url.startsWith('http') ? url : this.baseurl+url;
    }

    get(url:string,params?:object){
        return new Promise((resolve,reject)=>{
            params = params || {};
            params['_'] = Math.random();
            this.http.request(this.filterUrl(url),new RequestOptions({
                method:RequestMethod.Get,
                search:params,
                headers:new Headers({
                    Authorization:window.sessionStorage.getItem('xxtoken')
                })
            })).toPromise().then(res=>{
                if(!res.json().status && res.json().error == "unauthorized"){
                    this.router.navigate(['/login']);
                    return false;
                }
                resolve(res.json());
            }).catch(err=>{
                reject(err);
            })
        })
    }
    post(url:string,params?:object){
        params = params || {};
        const _params = new URLSearchParams();
        for(let attr in params){
            _params.set(attr,params[attr]);
        }
        const header: any = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: window.sessionStorage.getItem('xxtoken')
        });
        const options: any = new RequestOptions({headers: header});
        return new Promise((resolve,reject)=>{
            this.http.post(this.filterUrl(url),_params,options).subscribe(res=>{
                if(!res.json().status && res.json().message == "unauthorized"){
                    this.router.navigate(['/login']);
                    return false;
                }
                resolve(res.json());
            },err=>{
                reject(err);
            })
        })
    }
}
