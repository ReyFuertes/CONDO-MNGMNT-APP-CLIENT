export enum TOASTTYPE {
  SAVE = 1,
  UPDATED = 2,
  DELETED = 3 
}
export enum OnboardingEntityType {
  ONBOARDINGTYPE = '1',
  ONBOARDINGPERSONAL = '2',
  ONBOARDINGPARTNER = '3',
  ONBOARDINGOCCUPANTS = '4',
  ONBOARDINGDOCUMENTS = '5',
  ONBOARDINGREVIEW = '6'
}
export enum AddEditStateType {
  'Add' = 1,
  'Edit' = 2
}
export interface IMyInfo {
  lastname?: string;
  firstname?: string;
  middlename?: string;
  citizenship?: string;
  gender?: string;
  civilStatus?: string;
  dateOfBirth?: string;
  occupation?: string;
  tin?: string;
  idType?: string;
  idNo?: string;
  uploadedIdFile?: string;
  uploadedFilePreview?: string;
}
export interface IBuilding { }
export interface IUnit { }
export interface IParkingSLot { }
export interface ISimpleItem extends ISimpleAttribute {
  label?: string;
  value?: string;
}
export interface ISimpleAttribute {
  route?: string
}