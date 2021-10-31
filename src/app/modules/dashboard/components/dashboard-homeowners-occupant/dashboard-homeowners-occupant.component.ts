import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IHomeowner, IOccupant } from 'src/app/models/homeowners.model';
import { RooState } from 'src/app/store/root.reducer';
import { getHomeownerOccupantsAction } from '../../store/actions/dashboard-homeowners.action';
import { getDashboardHomeownerOccupantsSelector, getDashboardHomeownersByIdSelector } from '../../store/selectors/dashboard-homeowner.selector';

@Component({
  selector: 'cma-dashboard-homeowners-occupant',
  templateUrl: './dashboard-homeowners-occupant.component.html',
  styleUrls: ['./dashboard-homeowners-occupant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeownersOccupantComponent implements OnInit, OnChanges {
  @Input() public homeownerId: string;

  @ViewChild('paginator', { static: false }) paginator: any;

  public pGRowCount: number = 3;
  public pGSkipCount: number = 0;
  public paginationParams: string;
  public pageSizeOptions: number[] = [3, 10, 20, 30];
  public $homeowner: Observable<IHomeowner>

  constructor(private store: Store<RooState>, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.$homeowner = this.store.pipe(select(getDashboardHomeownersByIdSelector(this.homeownerId)));
    this.$homeowner.subscribe(res => console.log(res))
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.homeownerId = changes?.homeownerId.currentValue;
  }

  public onPageChange(event: any): void {
    const payload = {
      homeowner: { id: this.homeownerId },
      take: event?.take,
      skip: event?.skip,
    }
    this.store.dispatch(getHomeownerOccupantsAction({ payload }));
  }
}
