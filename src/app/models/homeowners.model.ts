import { IOnboardingDocument, IOnboardingOccupant, IPersonal, IOnboardingSpouse, IOnboardingVehicle } from "../modules/on-boarding/on-boarding.model";
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
export interface ITenant {
  id: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  contactNo?: string;
  email?: string;
}
export interface IHomeowner {
  id: string;
  created_at?: string;
  personal?: IPersonal,
  spouse?: IOnboardingSpouse,
  vehicles?: IOnboardingVehicle[],
  documents?: IOnboardingDocument[],
  occupants?: IOnboardingOccupant[]
}