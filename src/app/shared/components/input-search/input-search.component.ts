import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class CMAInputSearchComponent extends GenericControl<string> implements OnInit {
  constructor() {
    super();
  }
  private search$ = new BehaviorSubject('');

  @ViewChild('input', { static: false }) input: any;

  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      takeUntil(this.$unsubscribe)
    ).subscribe((keyword) => {
      this.valueEmitter.emit(keyword);
    });
  }

  public onClear(): void {
    this.input.nativeElement.value = '';
    this.valueEmitter.emit(null);
  }

  public get hasLen(): boolean {
    return this.input?.nativeElement?.value?.length > 0;
  }

  public onInput(event: any): void {
    this.search$.next(event?.target?.value.trim());
  }
}
