import { OccupantType } from "src/app/models/onboarding.model";
import { IMyInfo, IBuilding, IUnit, IParkingSLot } from "src/app/shared/generics/generic-model";

export interface IOnboardingPersonal extends IMyInfo {
  building?: IBuilding,
  unit?: IUnit,
  parking?: IParkingSLot,
  occupantType?: OccupantType,
}