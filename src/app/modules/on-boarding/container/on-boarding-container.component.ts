import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { STROCCUPANTS, STRPERSONAL, STRSPOUSE, STRVEHICLES } from 'src/app/shared/constants/generic';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy';
import { RooState } from 'src/app/store/root.reducer';
import { addToOccupantsAction, addToPersonalAction, addToSpouseAction, addToTypeAction, addToVehiclesAction } from '../store/onboarding.action';
import * as moment from 'moment';

@Component({
  selector: 'cma-on-boarding-container',
  templateUrl: './on-boarding-container.component.html',
  styleUrls: ['./on-boarding-container.component.scss']
})
export class OnboardingContainerComponent extends GenericDestroyPageComponent implements OnInit {
  public hideStepper: boolean = false;
  public id: string;

  constructor(private route: ActivatedRoute, private _storageSrv: StorageService, private store: Store<RooState>, private router: Router) {
    super();
  }

  ngOnInit(): void {
    /* feed the state with localstorage values when refreshed */
    const type = this._storageSrv.get('type');
    if (type) {
      const t = JSON.parse(type);
      this.store.dispatch(addToTypeAction({ payload: t }));
    }
    const personal = this._storageSrv.get(STRPERSONAL);
    if (personal) {
      let p = JSON.parse(personal);
      p = {
        ...p,
        dateOfBirth: new Date(p?.dateOfBirth)
      }
      this.store.dispatch(addToPersonalAction({ payload: p }));
    }
    const spouse = this._storageSrv.get(STRSPOUSE);
    if (spouse) {
      const s = JSON.parse(spouse);
      this.store.dispatch(addToSpouseAction({ payload: s }));
    }
    const occupants = this._storageSrv.get(STROCCUPANTS);
    if (occupants) {
      const occupantsArr = JSON.parse(occupants)?.occupants;
      this.store.dispatch(addToOccupantsAction({ payload: occupantsArr }));
    }
    const vehicles = this._storageSrv.get(STRVEHICLES);
    if (vehicles) {
      const vehiclesArr = JSON.parse(vehicles)?.vehicles;
      this.store.dispatch(addToVehiclesAction({ payload: vehiclesArr }));
    }

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const forApproval = e.urlAfterRedirects.includes('for-approval');

        if (forApproval) {
          this.hideStepper = true;
        } else this.hideStepper = false;
      });
  }
}
