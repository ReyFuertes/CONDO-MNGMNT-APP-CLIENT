import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createOnboardingAction, createOnboardingSuccessAction, saveAndUploadImageAction, saveAndUploadImageSuccessAction } from './onboarding.action';
import { OnboardingService } from '../on-boarding.service';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { combineLatest, forkJoin, of, zip } from 'rxjs';
import { MessageService } from 'primeng/api';
import { RooState } from 'src/app/store/root.reducer';
import { isLoadingSelector } from 'src/app/store/selector/app.selector';
import { GenericToastComponent } from 'src/app/shared/generics/generic-toast';
import { Router } from '@angular/router';
import { ONBOARDINGFORAPPROVALROUTE } from 'src/app/shared/constants/routes';
import { IOnboarding, IOnboardingPersonal } from '../on-boarding.model';
import { UploadService } from 'src/app/services/upload.service';
import { ImageService } from 'src/app/services/image.service';
@Injectable()
export class OnboardingEffects extends GenericToastComponent {
  constructor(router: Router,
    private uploadSrv: UploadService,
    private actions$: Actions,
    private store: Store<RooState>,
    private onBoardingSrv: OnboardingService,
    private imageSrv: ImageService,
    msgSrv: MessageService) {
    super(router, msgSrv);
  }

  saveAndUploadImageAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveAndUploadImageAction),
    mergeMap(({ payload, images }) => {
      return zip(
        this.imageSrv.post(payload),
        this.uploadSrv.upload(images, 'images'),
        this.store.pipe(select(isLoadingSelector))
      ).pipe(
        map(([response, fileDoc, loader]) => {
          return saveAndUploadImageSuccessAction({ response });
        })
      )
    })
  ));

  createOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(createOnboardingAction),
    mergeMap(({ payload, files, personalIdAttachment, spouseIdAttachment }) => {
      return zip(
        this.onBoardingSrv.post(payload),
        this.uploadSrv.upload(files),
        this.store.pipe(select(isLoadingSelector))
      ).pipe(
        map(([response, fileDoc, loader]) => {
          const { personal, spouse } = <IOnboarding>response;
          debugger
          this.store.dispatch(saveAndUploadImageAction({
            payload: {
              name: personalIdAttachment?.image?.name,
              personal: { id: <IOnboardingPersonal>personal?.id }
            },
            images: personalIdAttachment?.data
          }));

          this.store.dispatch(saveAndUploadImageAction({
            payload: {
              name: spouseIdAttachment?.image?.name,
              spouse: { id: <IOnboardingPersonal>spouse?.id }
            },
            images: spouseIdAttachment?.data
          }));

          if (loader === null) {
            this.triggerSaveToast(ONBOARDINGFORAPPROVALROUTE);
          }
          return createOnboardingSuccessAction({ response: <IOnboarding>response });
        })
      )
    })
  ));
}
