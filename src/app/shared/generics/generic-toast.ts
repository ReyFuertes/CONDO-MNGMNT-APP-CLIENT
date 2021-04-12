import { Directive, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { APPTIMING } from '../constants/generic';
import { TOASTSADDSUCCESS, TOASTSEVERITYSUCCESS } from '../constants/toast';

@Directive()
export class GenericToastComponent {
  constructor(private router: Router, private msgSrv: MessageService) { }

  public triggerSaveToast(routeUrl?: string): void {
    this.msgSrv.add({
      key: 't',
      severity: TOASTSEVERITYSUCCESS,
      summary: TOASTSADDSUCCESS(), life: APPTIMING
    });

    if (routeUrl) {
      setTimeout(() => {
        this.router.navigateByUrl(routeUrl);
      }, APPTIMING);
    }
  }
}
