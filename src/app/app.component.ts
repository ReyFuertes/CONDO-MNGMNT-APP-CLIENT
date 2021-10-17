import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { INotification } from './models/generic.model';
import { LoaderInterceptorService } from './services/loader.interceptor';
import { TOASTSADDSUCCESS, TOASTSEVERITYSUCCESS } from './shared/constants/toast';
import { GenericDestroyPageComponent } from './shared/generics/generic-destroy';
import { TOASTTYPE } from './shared/generics/generic-model';
import { removeNotification } from './store/action/notification.action';
import { RooState } from './store/root.reducer';
import { isLoadingSelector } from './store/selector/app.selector';
import { getSuccessSelector } from './store/selector/notification.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public appLoading: boolean = false;
  public title = 'CMA';
  public $notify: Observable<INotification>;

  constructor(private cdRef: ChangeDetectorRef, private store: Store<RooState>, public loaderSrv: LoaderInterceptorService) {
    super();
  }

  ngOnInit(): void {
    this.$notify = this.store.pipe(select(getSuccessSelector), delay(300), takeUntil(this.$unsubscribe));
  }

  public onClose(): void {
    this.store.dispatch(removeNotification());
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(isLoadingSelector))
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(appLoading => {
        this.appLoading = appLoading;
        this.cdRef.detectChanges();
      });
  }

  public onReject(): void { }
  public onConfirm(): void { }
}
