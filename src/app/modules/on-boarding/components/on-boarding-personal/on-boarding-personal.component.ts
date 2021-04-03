import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OccupantType } from 'src/app/models/onboarding.model';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import * as _ from 'lodash';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'cma-on-boarding-personal',
  templateUrl: './on-boarding-personal.component.html',
  styleUrls: ['./on-boarding-personal.component.scss']
})
export class OnboardingPersonalComponent extends GenericDestroyPageComponent implements OnInit {
  public form: FormGroup;
  public options: ISimpleItem[] = [{
    label: 'Home Owner',
    value: String(OccupantType.HomeOwner)
  }, {
    label: 'Tenant',
    value: String(OccupantType.Tenant)
  }, {
    label: 'Authorized Rep.',
    value: String(OccupantType.AuthorizedRepresentative)
  }];
  public selectedOccupantType: string = String(OccupantType.HomeOwner);
  public buildingNoOptions: ISimpleItem[] = [{
    label: 'Building #1',
    value: 'bldg1'
  }, {
    label: 'Building #2',
    value: 'bldg2'
  }, {
    label: 'Building #3',
    value: 'bldg3'
  }, {
    label: 'Building #4',
    value: 'bldg4'
  }, {
    label: 'Building #5',
    value: 'bldg5'
  }, {
    label: 'Building #9',
    value: 'bldg9'
  }];
  public unitNoOptions: ISimpleItem[] = [{
    label: 'Unit 901'
  }, {
    label: 'Unit 902'
  }, {
    label: 'Unit 903'
  }, {
    label: 'Unit 904'
  }, {
    label: 'Unit 905'
  }];
  public parkingNoOptions: ISimpleItem[] = [{
    label: 'Park Slot #1'
  }, {
    label: 'Park Slot #2'
  }, {
    label: 'Park Slot #3'
  }, {
    label: 'Park Slot #4'
  }];
  public genderOptions: ISimpleItem[] = [{
    label: 'Male',
    value: 'male'
  }, {
    label: 'Female',
    value: 'female'
  }, {
    label: 'Other',
    value: 'other'
  }];
  public civilOptions: ISimpleItem[] = [{
    label: 'Married',
    value: 'married'
  }, {
    label: 'Single',
    value: 'single'
  }];
  public IdTypeOptions: ISimpleItem[] = [{
    label: 'Passport',
    value: 'passport'
  }, {
    label: 'Drivers License',
    value: 'driverslicense'
  }];
  public files: File[] = [];

  constructor(private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      buildingNo: [null],
      unitNo: [null],
      parkingSlot: [null],
      personalLastname: [null],
      personalFirstname: [null],
      personalMiddlename: [null],
      personalCitizenship: [null],
      personalGender: [null],
      personalCivilStatus: [null],
      personalDateOfBirth: [null],
      personalOccupation: [null],
      personalTin: [null],
      personalIdType: [null],
      personalIdNo: [null],
      personalUploadedIdFile: [null],
      personalUploadedFilePreview: [null],
    });
  }

  ngOnInit(): void { }

  public onPersonalImageChange(event: any): void {
    let file: any
    if (_.isObject(event)) {
      file = event;
    } else {
      file = event.target.files[0];
    }
    this.files.push(file);
    this.onConvertBlobToBase64(event, file, 'personalUploadedIdFile');
  }

  private onConvertBlobToBase64(event: any, file: any, formName: string): any {
    /* collect all drop images in base64 results */
    convertBlobToBase64(event).pipe(take(1),
      takeUntil(this.$unsubscribe),
      map(b64Result => {
        return {
          image: b64Result,
          filename: `${uuid()}.${file.name.split('?')[0].split('.').pop()}`,
          file: file,
          size: file.size,
          mimetype: file.type
        }
      })).subscribe((b64Image) => {
        if(formName === 'personalUploadedIdFile') {
          this.form.get('personalUploadedFilePreview').patchValue(b64Image?.image);
        }
        this.form.get(formName).patchValue(b64Image);
      });
  }

  public get getPersonalUploadedFilePreview(): any {
    return this.form.get('personalUploadedFilePreview')?.value;
  }

  public getImagePreview(formName: string): any {
    return this.form.get(formName)?.value?.filename;
  }
}
