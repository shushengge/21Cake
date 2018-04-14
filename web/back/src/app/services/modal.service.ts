import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
    modalshow:Boolean = false;
    modalcolumns:Array<any> = [];
    modaltr:Object = {};
    modalActive:string = '';
    spinnerShow:boolean = false;
    dataset;
    constructor() { }
}
