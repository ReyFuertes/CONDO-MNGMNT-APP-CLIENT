import { ActionReducerMap } from '@ngrx/store';
import { OnboardingReducer, OnboardingState } from '../modules/on-boarding/store/onboarding.reducer';
import { AppReducer, AppState } from './reducer/app.reducer';
import { NotificationReducer, NotificationState } from './reducer/notification.reducer';

export interface RooState {
  app: AppState,
  onboarding: OnboardingState,
  notification?: NotificationState,
}
export const reducers: ActionReducerMap<RooState> = {
  app: AppReducer,
  onboarding: OnboardingReducer,
  notification: NotificationReducer,
};
