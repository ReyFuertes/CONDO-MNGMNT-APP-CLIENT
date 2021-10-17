import { Directive, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { appNotificationAction } from 'src/app/store/action/notification.action';
import { RooState } from 'src/app/store/root.reducer';
import { APPTIMING } from '../constants/generic';
import { TOASTSADDSUCCESS, TOASTSEVERITYSUCCESS } from '../constants/toast';

@Directive()
export class GenericNotificationComponent {
  constructor(private router: Router, private store: Store<RooState>) { }

  public show(routeUrl?: string, message?: string): void {
    this.store.dispatch(appNotificationAction({
      notification: { success: true, message: message }
    }));

    if (routeUrl) {
      setTimeout(() => {
        this.router.navigateByUrl(routeUrl);
      }, APPTIMING);
    }
  }
}
