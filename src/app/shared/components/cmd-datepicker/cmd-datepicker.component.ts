import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-datepicker',
  templateUrl: './cmd-datepicker.component.html',
  styleUrls: ['./cmd-datepicker.component.scss']
})
export class CMADatepickerComponent extends GenericControl<ISimpleItem> implements OnInit {
  @Input() placeholder: string;
  
  constructor() { 
    super();
  }

  ngOnInit(): void { }
}
