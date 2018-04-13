import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../../servers/httpclient.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    dataset:Array<any>;

    constructor(private http:HttpclientService,private router: Router) { }

    ngOnInit() {

    }
    find(){
        let title = document.querySelector('.mallSearchform_s .mallSearchform_txt');
        this.http.get('frontproducts',{title:title['value']}).then((res) => {
            if(res['status'] == true && title['value'] && res['data'].length >0){
                this.dataset=res['data']
            }else if(title['value'] == ""){
                this.dataset=null;
            }else{
                    this.dataset=[{cnname:'我都不知道你做错了什么...'}]
            }
        })
    }

    goto(id){
        console.log(id)
        this.router.navigate(['/details/'+id]);
    }

    back(){
        history.back()
    }
}
