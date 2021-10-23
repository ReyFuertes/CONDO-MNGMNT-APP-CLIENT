import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOccupant } from 'src/app/models/homeowners.model';
import { RooState } from 'src/app/store/root.reducer';
import { loadHomeownerOccupantsAction } from '../../store/actions/dashboard-homeowners.action';
import { getDashboardHomeownerOccupantsSelector } from '../../store/selectors/dashboard-homeowner.selector';

@Component({
  selector: 'cma-dashboard-homeowners-occupant',
  templateUrl: './dashboard-homeowners-occupant.component.html',
  styleUrls: ['./dashboard-homeowners-occupant.component.scss']
})
export class DashboardHomeownersOccupantComponent implements OnInit {
  @Input() public occupants: IOccupant[] = [];
  @Input() public homeownerId: string;

  public pGRowCount: number = 3;
  public pGSkipCount: number = 0;
  public paginationParams: string;
  public rowsPerPageOptions: number[] = [3, 10, 20, 30];
  public $homeownerOccupants: Observable<IOccupant[]>;

  constructor(private store: Store<RooState>) { }

  ngOnInit(): void {
    this.paginationParams = `homeowner_id=${this.homeownerId}&take=${this.pGRowCount}&skip=${this.pGSkipCount}`;
    this.store.dispatch(loadHomeownerOccupantsAction({ keyword: this.paginationParams }));

    this.$homeownerOccupants = this.store.pipe(select(getDashboardHomeownerOccupantsSelector))
  }

  public onPaginate(event: any): void {
    this.paginationParams = `homeowner_id=${this.homeownerId}&take=${event?.rows}&skip=${event?.first}`;
    this.store.dispatch(loadHomeownerOccupantsAction({ keyword: this.paginationParams }));
  }
}
