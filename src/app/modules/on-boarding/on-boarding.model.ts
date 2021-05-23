import { OccupantType } from "src/app/models/onboarding.model";
import { IMyInfo, IBuilding, IUnit, IParkingSLot } from "src/app/shared/generics/generic-model";

export interface IOnboarding {
  id?: string;
  personal?: IOnboardingPersonal;
  spouse?: any;
  occupants?: any;
  vehicles?: any;
  documents?: any;
  files?: any;
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
  building?: IBuilding;
  unit?: IUnit;
  parking?: IParkingSLot;
  occupantType?: OccupantType
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