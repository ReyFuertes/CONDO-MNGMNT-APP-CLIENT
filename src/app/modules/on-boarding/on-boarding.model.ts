import { OccupantType, OnBoardingType } from "src/app/models/onboarding.model";
import { IMyInfo, IBuilding, IUnit, IParkingSLot, ISimpleItem } from "src/app/shared/generics/generic-model";

export interface IOnboadingResponseDto {
  data?: IOnboarding[], count?: number
}
export interface IOnboarding {
  id?: string;
  type?: OnBoardingType;
  personal?: IOnboardingPersonal;
  spouse?: any;
  occupants?: IOnboardingOccupant[];
  vehicles?: any;
  documents?: any;
  documentsToUpload?: any;
}
export interface IOnboardingDocument {
  id?: string;
  label?: string;
  value?: string;
  file?: File;
  formName?: string;
  fileName?: string;
}
export interface IOnboardingSpouse extends IMyInfo {
  occupantType?: OccupantType
}
export interface IOnboardingPersonal extends IMyInfo {
  building?: IBuilding | ISimpleItem;
  unit?: IUnit | ISimpleItem;
  parking?: IParkingSLot | ISimpleItem;
  occupantType?: OccupantType | ISimpleItem
}
export interface IOnboardingVehicle {
  id?: string;
  model?: string;
  make?: string;
  plateNo?: string;
}
export interface IOnboardingOccupant {
  id?: string;
  name?: string;
  relationship?: string;
}