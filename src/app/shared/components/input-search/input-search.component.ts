import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GenericControl } from '../../generics/generic-control';

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

  @ViewChild('input', { static: false }) input: ElementRef;

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
    this.valueEmitter.emit('');
  }

  public get hasLen(): boolean {
    return this.input?.nativeElement?.value?.length > 0;
  }

  public onInput(event: any): void {
    this.search$.next(event?.target?.value.trim());
  }
}
