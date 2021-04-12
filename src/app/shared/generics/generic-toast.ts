import { Directive, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { TOASTSADDSUCCESS, TOASTSEVERITYSUCCESS } from '../constants/toast';

@Directive()
export class GenericToastComponent {
  constructor(private msgSrv: MessageService) { }

  public triggerSaveToast(): void {
    this.msgSrv.add({
      key: 't',
      severity: TOASTSEVERITYSUCCESS,
      summary: TOASTSADDSUCCESS(), life: 1000
    });
  }
}
