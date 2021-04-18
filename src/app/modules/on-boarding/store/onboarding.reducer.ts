import { createReducer, on, Action } from "@ngrx/store";
import { ISimpleItem } from "src/app/shared/generics/generic-model";
import { IOccupant, IOnboarding, IOnboardingDocument, IOnboardingPersonal } from "../on-boarding.model";
import { addDocumentsAction, addOccupantAction, clearStepperAction, createOnboardingSuccessAction, removeOccupantAction, setOnboardingStepperAction } from "./onboarding.action";
import * as _ from 'lodash';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export const adapter: EntityAdapter<IOnboarding> = createEntityAdapter<IOnboarding>({});
export interface OnboardingState extends EntityState<IOnboarding> {
  stepper?: string,
  type?: ISimpleItem,
  personal?: IOnboardingPersonal,
  occupants?: IOccupant[],
  documents?: any,
  onboardingSubmitted?: boolean
}
export const initialState: OnboardingState = adapter.getInitialState({
  stepper: null,
  type: null,
  personal: null,
  occupants: [],
  documents: null,
  onboardingSubmitted: null
});

const onboardingReducer = createReducer(
  initialState,
  on(clearStepperAction, (state) => {
    return Object.assign({}, state, { stepper: null });
  }),
  on(createOnboardingSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  }),
  on(createOnboardingSuccessAction, (state) => {
    return Object.assign({}, state, { onboardingSubmitted: true });
  }),
  on(addDocumentsAction, (state, action) => {
    return Object.assign({}, state, { documents: action.documents });
  }),
  on(removeOccupantAction, (state, action) => {
    let occupants: IOccupant[] = Object.assign([], state.occupants);
    let match = occupants.find(o => action?.item?.name === o?.name);
    if (match) {
      _.remove(occupants, { name: match?.name });
    }
    return Object.assign({}, state, { occupants });
  }),
  on(addOccupantAction, (state, action) => {
    let occupants = Object.assign([], state.occupants);
    if (!occupants.includes(action.response)) {
      occupants.push(action.response);
      return Object.assign({}, state, { occupants: occupants });
    } else {
      return Object.assign({}, state);
    }
  }),
  on(setOnboardingStepperAction, (state, action) => {
    return Object.assign({}, state, { stepper: action.step });
  })
);
export function OnboardingReducer(state: OnboardingState, action: Action) {
  return onboardingReducer(state, action);
}