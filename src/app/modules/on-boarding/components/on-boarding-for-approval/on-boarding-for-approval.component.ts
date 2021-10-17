import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { clearStepperAction } from '../../store/onboarding.action';

@Component({
  selector: 'cma-on-boarding-for-approval',
  templateUrl: './on-boarding-for-approval.component.html',
  styleUrls: ['./on-boarding-for-approval.component.scss']
})
export class OnboardingForApprovalComponent implements OnInit {
  public svgPath: string = environment.svgPath;

  constructor(private store: Store<RooState>, private storageSrv: StorageService, private router: Router) { }

  ngOnInit(): void { }

  public onDone(): void {
    setTimeout(() => {
      this.store.dispatch(clearStepperAction());
      this.storageSrv.clear();
      this.router.navigateByUrl('/dashboard/on-boarding/list');
    }, 100);
  }
}
