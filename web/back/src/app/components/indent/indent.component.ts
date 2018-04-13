import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import {Utils} from '../../utils/utils'
// import {DictionaryService} from '../../services/dictionary.service'
import {HttpclientService} from '../../services/httpclient.service'

@Component({
  selector: 'app-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.css',
  '../products/products.component.css',
  '../welcome/welcome.component.css',
  '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
]
})
export class IndentComponent implements OnInit {
  dataset:Array<any>;
  dsColumns: Array<string> = [];
  columns: Array<string> = [];
  filterColumns: Array<string> = [];
  hideColumns: Array<string> = [];
  columnsAttributes: Object = {};

  constructor(private http: HttpclientService) { }

  ngOnInit() {
      this.http.get('http://localhost:4200/assets/config/indent.txt').then((config)=>{
          if(config['cols']){
               this.columns = config['cols'].split(',');
          }
          if(config['filterCols']){
            this.filterColumns = config['filterCols'].split(',');
          }
          if(config['hideCols']){
            this.hideColumns = config['hideCols'].split(',');
          }
          this.columnsAttributes = config['colAttributes'] || {};
          this.http.get('selectCart',{page:1,limit:7}).then((res)=>{
            for(var i=0;i<this['pageNumber+1'];i++){
              if(i!=0){
                this['pageNumberArray'].push(i);
              }
            }
            this.dataset = res['data'];
            this.dsColumns = Object.keys(this.dataset[0]);
            this.matchCols();
            console.log(res)
          })
      })
  }

  matchCols(){
      if(this.columns.length < 1){
        this.columns = JSON.parse(JSON.stringify(this.dsColumns));
      }
      for(let fitlerCol of this.filterColumns){
        if(this.columns.indexOf(fitlerCol) > -1){
          this.columns.splice(this.columns.indexOf(fitlerCol), 1);
        }
      }
      for(let hideCol of this.hideColumns){
        if(this.columns.indexOf(hideCol) < 0){
          this.columns.push(hideCol);
        }
      }
  }

  getKeys(item){
      return item ? Object.keys(item) : [];
  }

  dataFilter(value, key){
    //value = 2016-09-21T09:10:41.000Z
    if(this.columnsAttributes[key]){
      let type = this.columnsAttributes[key].type; //datetime
      let format = this.columnsAttributes[key].format; //yyyy-MM-dd hh:mm:ss
      let reg = this.columnsAttributes[key].reg; //yyyy-MM-dd hh:mm:ss
      let val = this.columnsAttributes[key].val; //yyyy-MM-dd hh:mm:ss
      switch(type){
        case 'datetime':
          return Utils.dateFormat(new Date(value), format);
        case 'replaceReg':
          let _reg = new RegExp(reg);
          return value.replace(_reg, val);
      }
    }
    return value;

  }
}
