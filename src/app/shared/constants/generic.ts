import { ISimpleItem } from "../generics/generic-model";
export const BTNTEXTUPDATE = 'Update';
export const BTNTEXTSAVE = 'Save';
export const ONBOARDINGTYPE = '1';
export const ONBOARDINGPERSONAL = '2';
export const ONBOARDINGPARTNER = '3';
export const ONBOARDINGOCCUPANTS = '4';
export const ONBOARDINGDOCUMENTS = '5';
export const ONBOARDINGREVIEW = '6';
export const RELATIONSOPTIONS: ISimpleItem[] = [{
  label: 'Father',
  value: '1'
}, {
  label: 'Mother',
  value: '2'
}, {
  label: 'Brother',
  value: '3'
}, {
  label: 'Sister',
  value: '4'
}, {
  label: 'Children',
  value: '5'
}, {
  label: 'Other',
  value: '6'
}];
export const BUILDINGNOOPTIONS: ISimpleItem[] = [{
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
export const UNITNOOPTIONS: ISimpleItem[] = [{
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
export const PARTKINGNOOPTIONS: ISimpleItem[] = [{
  label: 'Park Slot #1'
}, {
  label: 'Park Slot #2'
}, {
  label: 'Park Slot #3'
}, {
  label: 'Park Slot #4'
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