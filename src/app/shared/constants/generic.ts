import { OccupantType } from "src/app/models/onboarding.model";
import { ISimpleItem } from "../generics/generic-model";

export const STRTYPE = 'type';
export const STRPERSONAL = 'personal';
export const STRSPOUSE = 'spouse';
export const STROCCUPANTS = 'occupants';
export const STRDOCUMENTS = 'documents';
export const STRVEHICLES = 'vehicles';

export const APPTIMING = 1000;
export const BTNTEXTUPDATE = 'Update';
export const BTNTEXTSAVE = 'Save';
export const ONBOARDINGTYPE = '1';
export const ONBOARDINGPERSONAL = '2';
export const ONBOARDINGSPOUSE = '3';
export const ONBOARDINGOCCUPANTS = '4';
export const ONBOARDINGVEHICLES = '5';
export const ONBOARDINGDOCUMENTS = '6';
export const ONBOARDINGREVIEW = '7';
export const OCCUPANTOPTIONS: ISimpleItem[] = [{
  label: 'Home Owner',
  value: String(OccupantType.HomeOwner)
}, {
  label: 'Tenant',
  value: String(OccupantType.Tenant)
}, {
  label: 'Authorized Rep.',
  value: String(OccupantType.AuthorizedRepresentative)
}];
export const RELATIONSOPTIONS: ISimpleItem[] = [{
  label: 'Father',
  value: 'father'
}, {
  label: 'Mother',
  value: 'mother'
}, {
  label: 'Brother',
  value: 'brother'
}, {
  label: 'Sister',
  value: 'sister'
}, {
  label: 'Children',
  value: 'children'
}, {
  label: 'Other',
  value: 'other'
}];
export const BUILDINGNOOPTIONS: ISimpleItem[] = [{
  label: 'Building 1',
  value: 'building 1'
}, {
  label: 'Building 2',
  value: 'building 2'
}, {
  label: 'Building 3',
  value: 'building 3'
}, {
  label: 'Building 4',
  value: 'building 4'
}, {
  label: 'Building 5',
  value: 'building 5'
}, {
  label: 'Building 6',
  value: 'building 6'
}];
export const UNITNOOPTIONS: ISimpleItem[] = [{
  label: 'Unit 901',
  value: 'unit 901'
}, {
  label: 'Unit 902',
  value: 'unit 902'
}, {
  label: 'Unit 903',
  value: 'unit 903'
}, {
  label: 'Unit 904',
  value: 'unit 904'
}, {
  label: 'Unit 905',
  value: 'unit 905'
}];
export const PARTKINGNOOPTIONS: ISimpleItem[] = [{
  label: 'Park Slot #1',
  value: 'park slot #1'
}, {
  label: 'Park Slot #2',
  value: 'park slot #2'
}, {
  label: 'Park Slot #3',
  value: 'park slot #3'
}, {
  label: 'Park Slot #4',
  value: 'park slot #4'
}];
export const GENDEROPTIONS: ISimpleItem[] = [{
  label: 'Male',
  value: 'male'
}, {
  label: 'Female',
  value: 'female'
}, {
  label: 'Other',
  value: 'other'
}];
export const CIVILOPTIONS: ISimpleItem[] = [{
  label: 'Married',
  value: 'married'
}, {
  label: 'Single',
  value: 'single'
}];
export const IDTYPEOPTIONS: ISimpleItem[] = [{
  label: 'Passport',
  value: 'passport'
}, {
  label: 'Drivers License',
  value: 'driverslicense'
}];