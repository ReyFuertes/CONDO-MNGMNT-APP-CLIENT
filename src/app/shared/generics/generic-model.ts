export enum TOASTTYPE {
  SAVE = 1,
  UPDATED = 2,
  DELETED = 3
}
export enum OnboardingEntityType {
  ONBOARDINGTYPE = '1',
  ONBOARDINGPERSONAL = '2',
  ONBOARDINGSPOUSE = '3',
  ONBOARDINGOCCUPANTS = '4',
  ONBOARDINGVEHICLES = '5',
  ONBOARDINGDOCUMENTS = '6',
  ONBOARDINGREVIEW = '7'
}
export enum AddEditStateType {
  'Add' = 1,
  'Edit' = 2
}
export interface IMyInfo {
  id?: string;
  lastname?: string;
  firstname?: string;
  middlename?: string;
  citizenship?: string;
  gender?: string | ISimpleItem;
  civilStatus?: string | ISimpleItem;
  dateOfBirth?: string;
  occupation?: string;
  tin?: string;
  idType?: string | ISimpleItem;
  idNo?: string;
  uploadePersonalIdFile?: File;
  uploadeSpouseIdFile?: File;
  uploadedPersonalFilePreview?: any;
  uploadedSpouseFilePreview?: any;
}
export interface IBuilding { }
export interface IUnit { }
export interface IParkingSLot { }
export interface ISimpleItem extends ISimpleAttribute {
  label?: string;
  value?: string;
}
export interface ISimpleAttribute {
  route?: string;
  keyword?: string;
}