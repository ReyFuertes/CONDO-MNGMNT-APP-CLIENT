import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGDOCUMENTS, ONBOARDINGREVIEW, STRDOCUMENTS, STROCCUPANTS, STRPERSONAL, STRSPOUSE, STRTYPE, STRVEHICLES } from 'src/app/shared/constants/generic';
import { ISimpleItem, OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { createOnboardingAction, setOnboardingStepperAction, updateOnboardingAction } from '../../store/onboarding.action';
import { getDocumentsSelector, getOnboardingSelector } from '../../store/onboarding.selector';
import * as _ from 'lodash';
import { ONBOARDINGDOCUMENTSROUTE } from 'src/app/shared/constants/routes';
import { v4 as uuid } from 'uuid';
import { CamelToSnakeCase, FmtFormToPayload, ReplaceByUnderscore } from 'src/app/shared/util/formating';
import * as moment from 'moment';
@Component({
  selector: 'cma-on-boarding-review',
  templateUrl: './on-boarding-review.component.html',
  styleUrls: ['./on-boarding-review.component.scss']
})
export class OnboardingReviewComponent extends GenericOnBoardingComponent implements OnInit {
  public uploadDocuments: ISimpleItem[] = [];
  public svgPath: string = environment.svgPath;
  public uploadedDocs: any[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>,
    private _storageSrv: StorageService, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>) {
    super(ONBOARDINGREVIEW, storageSrv, router, cdRef, fb, store);
  }

  ngOnInit(): void {
    this._store.pipe(select(getOnboardingSelector), takeUntil(this.$unsubscribe))
      .subscribe(res => {
        const { type, personal, spouse, occupants, vehicles, documents, documentsToUpload } = FmtFormToPayload(res);

        if (type) this.form.get(STRTYPE).patchValue(type);

        if (personal) this.getPersonalForm.patchValue(personal, { emitEvent: false });

        if (spouse) this.getSpouseForm.patchValue(spouse, { emitEvent: false });

        if (occupants) {
          this.getOccupantsForm.clear();
          occupants?.forEach(occupant => {
            this.FormOccupantsArr = this.getOccupantsForm;
            this.FormOccupantsArr.push(this.createOccupantItem(Object.assign({}, occupant)));
          });
        }

        if (vehicles) {
          this.getVehiclesForm.clear();
          vehicles?.forEach(vehicle => {
            this.FormVehiclesArr = this.form.get(STRVEHICLES) as FormArray;
            this.FormVehiclesArr.push(this.createVehicleItem(Object.assign({}, vehicle)));
          });
        }

        if (documents) {
          this.getDocumentsForm.clear();
          documents?.forEach(document => {
            this.formDocumentsArr = this.getDocumentsForm;
            if (document?.id) {
              this.formDocumentsArr.push(this.createDocumentItem(Object.assign({}, document)));
            }
          });
          this.toUploadDocs = documentsToUpload || [];
        }
      });
  }

  public get hasToUploadDocs(): boolean {
    return this.toUploadDocs?.length > 0;
  }
  public get hasUploadedDocs(): boolean {
    return this.getDocumentFiles?.length > 0;
  }

  public get getPersonalIdFileName(): any {
    return this.form.get('personal')?.value?.uploadPersonalIdFile?.name;
  }

  public get getSpouseIdFileName(): any {
    return this.form.get('spouse')?.value?.uploadSpouseIdFile?.name;
  }

  private processFormData(files: FormData, onboarding_id: string): any {
    return Object.values(this.toUploadDocs?.map(doc => {
      const docArr = doc.name.split('.');
      const filename = `${ReplaceByUnderscore(docArr[0])}_${moment().format('MM_DD_YYYY')}.${docArr[1]}`;

      files.append('files', doc, filename);

      return {
        name: filename,
        size: doc.size,
        type: doc.type,
        onboarding_id: '',
        lastModified: doc.lastModified,
        lastModifiedDate: doc.lastModifiedDate,
        onboarding: { id: onboarding_id }
      }
    })) || null;
  }

  private processImageData(image: any, files: FormData): any {
    if (!image?.name) return null;

    const docArr = image?.name?.split('.');
    const filename = `${ReplaceByUnderscore(docArr[0])}_${moment().format('MM_DD_YYYY')}.${docArr[1]}`;

    files.append('files', image, filename);

    return {
      name: filename,
      size: image.size,
      type: image.type,
      onboarding_id: '',
      lastModified: image.lastModified
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { id, personal, spouse, occupants, vehicles, documents } = this.form.value;
      const { uploadPersonalIdFile } = personal;
      const { uploadSpouseIdFile } = spouse;

      let files = new FormData();
      let toUploadDocuments = this.processFormData(files, id);
      toUploadDocuments = toUploadDocuments.concat(documents);

      let personalFormData = new FormData();
      const personalImageData = this.processImageData(uploadPersonalIdFile, personalFormData);

      let spouseFormData = new FormData();
      const spouseImageData = this.processImageData(uploadSpouseIdFile, spouseFormData)

      const payload = {
        id,
        personal: {
          ...personal,
          civilStatus: this.form.get(STRPERSONAL).value?.civilStatus?.value
        },
        spouse,
        occupants,
        vehicles,
        documents: toUploadDocuments,
        files
      };

      setTimeout(() => {
        this._store.dispatch(updateOnboardingAction({
          payload,
          files,
          personalIdAttachment: {
            data: personalFormData,
            image: personalImageData
          },
          spouseIdAttachment: {
            data: spouseFormData,
            image: spouseImageData
          }
        }));
      }, 100);
    }
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGDOCUMENTSROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }
}
