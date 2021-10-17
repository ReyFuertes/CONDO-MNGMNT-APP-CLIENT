export enum RouteActionsType {
  Add = 'add',
  Edit = 'edit'
}
export enum ServiceStatusType {
  Approved = 'Approved',
  Pending = 'Pending',
  Declined = 'Declined'
}
export enum ServiceType {
  Repair = 'Repair',
  Delivery = 'Delivery',
  Maintenance = 'Maintenance',
  Cleaning = 'Cleaning',
  Other = 'Other'
}
export enum MenuType {
  Dashboard = 0,
  Onboarding = 1,
  Homeowners = 2,
  Requests = 3,
  Invoices = 4,
  Documents = 5
}
export enum OccupantType {
  HomeOwner = 'home owner',
  Tenant = 'tenant',
  AuthorizedRepresentative = 'authorized representative'
}
export enum OnBoardingType {
  Individual = '1',
  Corporate = '2'
}