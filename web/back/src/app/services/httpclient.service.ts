import {Http, RequestOptions, RequestMethod, Headers, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpclientService{
    constructor(private http: Http, private router: Router){}

    private baseUrl: string = 'http://10.3.136.37:8080/';
    private getUrl(_url){
        if(_url.startsWith('http')){
            return _url;
        }
        return this.baseUrl + _url;
    }

    get(api, params = {}){
        return new Promise((resolve, reject) => {
            params['_'] = Math.random();
            this.http.request(this.getUrl(api), new RequestOptions({
                method: RequestMethod.Get,
                search: params,
                headers: new Headers(
                    {authorization: window.sessionStorage.getItem('jjtoken')}
                )
            })).toPromise().then((res) => {
                let _res = res.json();
                if(!_res.status && _res.error == "unauthorized"){
                    this.router.navigate(['/login']);
                    return false;
                }
                resolve(_res);
            }).catch((error) => {
                reject(error);
            });
        })
    }

    post(api, params = {}){
        const _params = new URLSearchParams();
        for(let attr in params){
            _params.set(attr,params[attr]);
        }
        return new Promise((resolve, reject) => {
            this.http.request(this.getUrl(api), new RequestOptions({
                method: RequestMethod.Post,
                body: _params,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    authorization: window.sessionStorage.getItem('ffztoken')
                })
            })).toPromise().then((res) => {

                let _res = res.json();
                if(!_res.status && _res.error == "unauthorized"){
                    this.router.navigate(['/login']);
                    return false;
                }
                resolve(_res);
            }).catch((error) => {
                reject(error);
            });
        })
    }
}
