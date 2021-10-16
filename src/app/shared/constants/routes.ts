import { RouteActionsType } from "src/app/models/onboarding.model";

export const ONBOARDINGTYPEROUTE = (id: string, action: RouteActionsType = RouteActionsType.Add) => `/on-boarding/type/${id}/${action}`;
export const ONBOARDINGPERSONALROUTE = (id: string, action: RouteActionsType = RouteActionsType.Add) => `/on-boarding/personal/${id}/${action}`;
export const ONBOARDINGSPOUSEROUTE = (id: string, action: RouteActionsType = RouteActionsType.Add) => `/on-boarding/spouse/${id}/${action}`;
export const ONBOARDINGOCCUPANTSROUTE = (id: string, action: RouteActionsType = RouteActionsType.Add) => `/on-boarding/occupants/${id}/${action}`;
export const ONBOARDINGDOCUMENTSROUTE = (id: string, action: RouteActionsType = RouteActionsType.Add) => `/on-boarding/documents/${id}/${action}`;
export const ONBOARDINGVEHICLESROUTE = (id: string, action: RouteActionsType = RouteActionsType.Add) => `/on-boarding/vehicles/${id}/${action}`;
export const ONBOARDINGREVIEWROUTE = (id: string, action: RouteActionsType = RouteActionsType.Add) => `/on-boarding/review/${id}/${action}`;
export const ONBOARDINGFORAPPROVALROUTE = '/on-boarding/for-approval';

export const DASHBOARDROUTE = '/dashboard';
export const DASHBOARDONBOARDINGROUTE = '/dashboard/on-boarding';
export const DASHBOARDONBOARDINGLISTROUTE = '/dashboard/on-boarding/list';
export const REQUESTSLISTROUTE = '/dashboard/requests/list';
export const INVOICESLISTROUTE = '/dashboard/payments/list';
export const HOMEOWNERSLISTROUTE = '/dashboard/homeowners/list';
export const DOCUMENTSLISTROUTE = '/dashboard/documents/list';
