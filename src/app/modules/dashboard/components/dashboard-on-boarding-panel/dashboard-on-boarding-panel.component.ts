import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { OnBoardingType, RouteActionsType } from 'src/app/models/onboarding.model';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation-dialog.component';
import { IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGACTIONID, ROUTEACTIONSTYPE } from 'src/app/shared/constants/generic';
import { ONBOARDINGTYPEROUTE } from 'src/app/shared/constants/routes';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy';
import { GenericRoute } from 'src/app/shared/generics/generic-route';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { approveDashboardOnboardingAction, archiveDashboardOnboardingAction, deleteDashboardOnboardingAction, loadDashboardOnboardingAction } from '../../store/actions/dashboard-onboarding.action';
import { getDashboardOnboardingSelector } from '../../store/selectors/dashboard-onboarding.selector';

@Component({
  selector: 'cma-dashboard-on-boarding-panel',
  templateUrl: './dashboard-on-boarding-panel.component.html',
  styleUrls: ['./dashboard-on-boarding-panel.component.scss']
})
export class DashboardOnboardingPanelComponent extends GenericRoute implements AfterViewInit {
  @Input() public paginationParams: any;
  @Output() public reloadEmitter = new EventEmitter<boolean>();

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public isExpanded: any = false;
  public onBoardingType = OnBoardingType;
  public onboardingStatus: any[];
  public $onboardings: Observable<IOnboarding[]>;

  constructor(private router: Router, private _storageSrv: StorageService, private dialog: MatDialog, storageSrv: StorageService, private store: Store<RooState>) {
    super(storageSrv);
  }

  ngAfterViewInit(): void {
    this.onboardingStatus = ['Approved', 'Orientation', 'Move-In'];
    this.$onboardings = this.store.pipe(select(getDashboardOnboardingSelector), delay(300));
  }

  public onReload(): void {
    this.reloadEmitter.emit(true);
    this.store.dispatch(loadDashboardOnboardingAction({ keyword: `${this.paginationParams}` }));
  }

  public getFullName(item: IOnboarding): string {
    return `${item?.personal?.firstname} ${item?.personal?.middlename} ${item?.personal?.lastname}`
  }

  public onPanelClick(i: number): void {
    this.isExpanded = i;
  }

  
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
