import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-input',
  templateUrl: './cma-input.component.html',
  styleUrls: ['./cma-input.component.scss']
})
export class CMAInputComponent extends GenericControl<ISimpleItem> implements OnInit {
  @Input() label: string;
  @Input() readOnly: string;
  @Input() value: string = null;

  constructor() {
    super();
  }

  ngOnInit(): void { }
}
