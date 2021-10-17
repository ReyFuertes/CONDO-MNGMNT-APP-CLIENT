import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RouteActionsType } from 'src/app/models/onboarding.model';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation-dialog.component';
import { IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGACTIONID, ROUTEACTIONSTYPE } from 'src/app/shared/constants/generic';
import { ONBOARDINGTYPEROUTE } from 'src/app/shared/constants/routes';
import { GenericRoute } from 'src/app/shared/generics/generic-route';
import { AppState } from 'src/app/store/reducer/app.reducer';
import { approveDashboardOnboardingAction, archiveDashboardOnboardingAction, deleteDashboardOnboardingAction } from '../../store/actions/dashboard-onboarding.action';

@Component({
  selector: 'cma-dashboard-on-boarding-panel-content',
  templateUrl: './dashboard-on-boarding-panel-content.component.html',
  styleUrls: ['./dashboard-on-boarding-panel-content.component.scss']
})
export class DashboardOnboardingPanelContentComponent extends GenericRoute implements OnInit {
  @Input() public item: IOnboarding;

  constructor(private dialog: MatDialog, private store: Store<AppState>, storageSrv: StorageService, private _storageSrv: StorageService, private router: Router) {
    super(storageSrv)
  }

  ngOnInit(): void { }

  public onApprove(item: IOnboarding): void {
    if (item) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '410px',
        data: { action: 0 }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(approveDashboardOnboardingAction({ payload: item }));
        } else { }
      });
    }
  }

  public onArchived(item: IOnboarding): void {
    if (item) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '410px',
        data: { action: 1 }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(archiveDashboardOnboardingAction({ payload: item }));
        } else { }
      });
    }
  }

  public onDelete(item: IOnboarding): void {
    if (item) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '410px',
        data: { action: 2 }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(deleteDashboardOnboardingAction({ payload: item }));
        } else { }
      });
    }
  }

  public onEdit(id: string): void {
    super.routeTo(ONBOARDINGACTIONID, id);
    super.routeTo(ROUTEACTIONSTYPE, RouteActionsType.Edit);
    this._storageSrv.set(ROUTEACTIONSTYPE, JSON.stringify(RouteActionsType.Edit));
    this.router.navigateByUrl(ONBOARDINGTYPEROUTE(id, RouteActionsType.Edit));
  }
}
