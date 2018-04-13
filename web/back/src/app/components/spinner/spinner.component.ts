import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(private spinner:ModalService) { }

  ngOnInit() {
  }

}
