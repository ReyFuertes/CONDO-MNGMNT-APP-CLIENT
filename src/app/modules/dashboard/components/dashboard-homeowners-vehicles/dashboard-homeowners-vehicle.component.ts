import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IVehicle } from 'src/app/models/homeowners.model';
import { RooState } from 'src/app/store/root.reducer';
import { loadHomeownerVehiclesAction } from '../../store/actions/dashboard-homeowners.action';
import { getDashboardVehicleOccupantsSelector } from '../../store/selectors/dashboard-homeowner.selector';

@Component({
  selector: 'cma-dashboard-homeowners-vehicle',
  templateUrl: './dashboard-homeowners-vehicle.component.html',
  styleUrls: ['./dashboard-homeowners-vehicle.component.scss']
})
export class DashboardHomeownersVehicleComponent implements OnInit {
  @Input() public vehicles: IVehicle[] = [];
  @Input() public homeownerId: string;

  public pGRowCount: number = 3;
  public pGSkipCount: number = 0;
  public paginationParams: string;
  public rowsPerPageOptions: number[] = [3, 10, 20, 30];
  public $homeownerVehicles: Observable<IVehicle[]>;

  constructor(private store: Store<RooState>) { }

  ngOnInit(): void {
    // this.paginationParams = `homeowner_id=${this.homeownerId}&take=${this.pGRowCount}&skip=${this.pGSkipCount}`;
    // this.store.dispatch(loadHomeownerVehiclesAction({ keyword: this.paginationParams }));

    // this.$homeownerVehicles = this.store.pipe(select(getDashboardVehicleOccupantsSelector))
  }

  public onPaginate(event: any): void {
    this.paginationParams = `homeowner_id=${this.homeownerId}&take=${event?.rows}&skip=${event?.first}`;
    this.store.dispatch(loadHomeownerVehiclesAction({ keyword: this.paginationParams }));
  }
}
