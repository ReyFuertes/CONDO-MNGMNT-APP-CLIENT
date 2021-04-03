import { Component, OnInit } from '@angular/core';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-stepper',
  templateUrl: './cma-stepper.component.html',
  styleUrls: ['./cma-stepper.component.scss']
})
export class CMStepperComponent implements OnInit {
  public stepper: ISimpleItem[];
  public currStep: number = 1;

  constructor() {

    this.stepper = [{
      label: 'Type',
      value: '1'
    }, {
      label: 'Personal',
      value: '2'
    }, {
      label: 'Partner',
      value: '3'
    }, {
      label: 'Document',
      value: '4'
    }];
  }

  ngOnInit(): void { }
}
