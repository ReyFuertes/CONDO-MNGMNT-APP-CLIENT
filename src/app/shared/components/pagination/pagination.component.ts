import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getHomeownerOccupantsAction } from 'src/app/modules/dashboard/store/actions/dashboard-homeowners.action';
import { RooState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output() public valueEmitter = new EventEmitter();

  constructor(private store: Store<RooState>) { }

  public onPageChange(event: any): void {
    this.valueEmitter.emit(event);
  }
}
