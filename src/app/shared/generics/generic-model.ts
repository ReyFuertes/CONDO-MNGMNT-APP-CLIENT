export interface IMyInfo {
  lastname?: string;
  firstname?: string;
  middlename?: string;
  citizenship?: string;
  gender?: string;
  civilStatus?: string;
  dateOfBirth?: string;
  occupation?: string;
  tin?: string;
  idType?: string;
  idNo?: string;
  uploadedIdFile?: string;
  uploadedFilePreview?: string;
}

export interface IBuilding { }

export interface IUnit { }

export interface IParkingSLot { }
export interface ISimpleItem extends ISimpleAttribute {
  label?: string;
  value?: string;
}

export interface ISimpleAttribute {}