import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class CMAInputSearchComponent extends GenericControl<ISimpleItem> implements OnInit {
  constructor() {
    super();
  }

  @ViewChild('input', { static: false }) input: any;

  ngOnInit(): void { }

  public onClear(): void {
    this.input.nativeElement.value = '';
  }

  public onInput(event: any, len: number = 3): void {
    if (event?.target?.value?.length > len) {
      this.valueEmitter.emit(event?.target?.value);
    }
  }
}
