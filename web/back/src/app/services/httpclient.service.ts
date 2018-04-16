import {Http, RequestOptions, RequestMethod, Headers, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ModalService} from './modal.service';


@Injectable()
export class HttpclientService{
    constructor(private http: Http, private router: Router,private spinner:ModalService){}

    private baseUrl: string = 'http://localhost:8080/';
    private getUrl(_url){
        if(_url.startsWith('http')){
            return _url;
        }
        return this.baseUrl + _url;
    }

    get(api, params = {}){
        return new Promise((resolve, reject) => {
            params['_'] = Math.random();

            //请求数据时，动画开始（开始转圈圈）
            this.spinner.spinnerShow = true;

            // 发起请求，请求方式：get
            // 登录成功，存储token，用于判断登录状态，若没有tockon，跳转到登录页面
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

                // 数据加载成功，动画结束（停止转圈圈）
                this.spinner.spinnerShow = false;

            }).catch((error) => {
                reject(error);
                this.spinner.spinnerShow = false;
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
                    authorization: window.sessionStorage.getItem('jjtoken')
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
