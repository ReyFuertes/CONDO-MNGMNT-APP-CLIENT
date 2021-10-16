import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { AppState } from 'src/app/store/reducer/app.reducer';
import { loadDashboardHomeownersAction } from '../store/actions/dashboard-homeowners.action';

@Component({
  selector: 'cma-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent {
  constructor(private store: Store<AppState>) {
    // this.store.dispatch(loadDashboardHomeownersAction({}));
  }
}
