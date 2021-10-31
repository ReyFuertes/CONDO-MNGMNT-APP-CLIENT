import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appPagination]',
  exportAs: 'pagination',
})
export class PaginationDirective {
  @Input() public pageSize: number;
  @Input() public totalCount: number;
  @Output() public onChangeEventEmitter = new EventEmitter();

  public pageNo: number = 1;
  public totalPages: number = 1;
  public pageIndex: number = 1;
  public pageLength: number = 0;
  public skip: number = 0;
  public take: number = 0;
  public isNextDisabled: boolean = false;
  public isPrevDisabled: boolean = false;

  constructor(private rendered: Renderer2, private el: ElementRef) {
    setTimeout(() => {
      this.totalPages = Math.floor(this.totalCount / this.pageSize)
      this.rendered.setProperty(this.el.nativeElement, 'value', `Page ${this.pageNo} of ${this.totalPages}`);
    }, 1000);
  }
  
  public onNext() {
    if (this.pageLength >= this.totalCount) return;

    if (this.pageIndex === 0) this.pageIndex = 1;

    if ((this.pageLength + this.pageSize) >= this.totalCount) {
      this.isNextDisabled = true;
      this.isPrevDisabled = false;
    }

    this.pageIndex = this.pageIndex + this.pageSize;
    this.pageLength = (this.pageSize - 1) + this.pageIndex;

    this.skip = this.skip + this.pageSize;
    this.take = this.pageSize - 1;

    this.pageNo++;

    this.setPage({
      pageIndex: this.pageIndex,
      pageLength: this.pageLength,
      take: this.take,
      skip: this.skip,
      pageNo: this.pageNo,
      isNextDisabled: this.isNextDisabled,
      isPrevDisabled: this.isPrevDisabled
    });
  }

  public onPrevious() {
    if (this.pageIndex <= 1) {
      this.pageIndex = 0;
      return;
    };

    if ((this.pageLength + this.pageSize) <= this.totalCount) {
      this.isNextDisabled = false;
      this.isPrevDisabled = true;
    }

    this.pageIndex = this.pageIndex - this.pageSize;
    this.pageLength = this.pageLength - (this.pageSize);

    this.skip = this.skip - this.pageSize;
    this.take = this.pageSize - 1;

    this.pageNo--;

    this.setPage({
      pageIndex: this.pageIndex,
      pageLength: this.pageLength,
      take: this.take,
      skip: this.skip,
      pageNo: this.pageNo,
      isNextDisabled: this.isNextDisabled,
      isPrevDisabled: this.isPrevDisabled
    });
  }

  public onFirst() {
    this.setPage(1);
  }

  public onLast() {
    this.setPage(this.totalCount);
  }

  public setPage(pageVar: any) {
    this.rendered.setProperty(this.el.nativeElement, 'value', `Page ${this.pageNo} of ${this.totalPages}`);
    this.onChangeEventEmitter.emit(pageVar);
  }
}