import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { OnBoardingType, RouteActionsType } from 'src/app/models/onboarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGPERSONAL, ROUTEACTIONSTYPE, STRTYPE } from 'src/app/shared/constants/generic';
import { DASHBOARDONBOARDINGLISTROUTE, ONBOARDINGPERSONALROUTE } from 'src/app/shared/constants/routes';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { addToTypeAction, clearStepperAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { getOnboardingTypeSelector } from '../../store/onboarding.selector';

@Component({
  selector: 'cma-on-boarding-type',
  templateUrl: './on-boarding-type.component.html',
  styleUrls: ['./on-boarding-type.component.scss']
})
export class OnboardingTypeComponent extends GenericOnBoardingComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public selectedTypeIsIndividual: any;
  public selectedTypeICorporate: any;
  public selectedType: OnBoardingType;
  public onboardingType = OnBoardingType;

  constructor(private route: ActivatedRoute, storageSrv: StorageService, router: Router, private _store: Store<RooState>,
    public _storageSrv: StorageService, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>, private _router: Router) {
    super(OnboardingEntityType.ONBOARDINGTYPE, storageSrv, router, cdRef, fb, store);

    this.id = this.route?.snapshot?.paramMap?.get('id') || null;
    if (this.id) {
      this.form.get('id').patchValue(this.id);
    }
    this.clearStorage();
    this._storageSrv.set('step', OnboardingEntityType.ONBOARDINGTYPE)
  }

  ngOnInit(): void {
    this._store.pipe(select(getOnboardingTypeSelector),
      debounceTime(100),
      takeUntil(this.$unsubscribe))
      .subscribe(type => {
        if (type) {
          this.selectedType = type;
          this.getSelection(this.selectedType)
        } else {
          const type = this._storageSrv.get('type');
          if (type) {
            this.selectedType = JSON.parse(type);
            this.getSelection(this.selectedType);
          }
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void { }

  public onSelect(chk: any): void {
    chk.checked = !chk.checked;

    this.getSelection(chk.value);
    this.selectedType = chk.value;
  }

  private getSelection(value: string): void {
    if (value == OnBoardingType.Individual) {
      this.selectedTypeIsIndividual = !this.selectedTypeIsIndividual;
      this.selectedTypeICorporate = false;
    } else if (value == OnBoardingType.Corporate) {
      this.selectedTypeICorporate = !this.selectedTypeICorporate;
      this.selectedTypeIsIndividual = false;
    }
  }

  public onNext(): void {
    super.onNext(ONBOARDINGPERSONALROUTE(this.id, <RouteActionsType>this.getActionFromStorage(ROUTEACTIONSTYPE)), STRTYPE, this.selectedType);

    this._store.dispatch(addToTypeAction({ payload: this.selectedType }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }

  public onCancel(): void {
    setTimeout(() => {
      this._store.dispatch(clearStepperAction());
      this._storageSrv.clear();
      this._router.navigateByUrl('/dashboard/on-boarding/list');
    }, 100);
    super.routeTo(DASHBOARDONBOARDINGLISTROUTE);
  }

  public get isDisabled(): boolean {
    return !this.selectedTypeIsIndividual && !this.selectedTypeICorporate;
  }
}
