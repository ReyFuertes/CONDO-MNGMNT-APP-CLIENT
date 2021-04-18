import { OccupantType } from "src/app/models/onboarding.model";
import { IMyInfo, IBuilding, IUnit, IParkingSLot } from "src/app/shared/generics/generic-model";

export interface IOnboarding {
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
export interface IOnboardingPersonal extends IMyInfo {
  building?: IBuilding;
  unit?: IUnit;
  parking?: IParkingSLot;
  occupantType?: OccupantType
}
export interface IVehicle {
  id?: string;
  model?: string;
  make?: string;
  plateNo?: string;
}
export interface IOccupant {
  id?: string;
  name?: string;
  relationship?: string;
}