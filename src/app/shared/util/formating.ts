import { IOnboarding } from "src/app/modules/on-boarding/on-boarding.model";
import * as _ from 'lodash';

export const RemoveNullOrUndefinedFromObj = (obj: any) => {
  return _.pick(obj, _.identity)
}

export const RemoveNullOrUndefinedFromArr = (arr: any) => {
  return arr?.filter(i => Boolean(i))
}

export const ReplaceByUnderscore = (str: string): string => {
  return str.replace(/ /g, '_')?.toLowerCase();
}

export const FmtToValue = (object: any) => {
  return object?.value?.toLowerCase() || null;
}

export const CamelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const FmtToSimpleItem = (state: any, field: string, entity: string) => {
  let _value: any;
  let _label: any;

  if (typeof (state[entity][field]) === 'object') {
    _label = state[entity][field]?.label;
    _value = state[entity][field]?.value?.toLowerCase();
  } else {
    _label = state[entity][field]?.replace(/\b\w/g, first => first?.toLocaleUpperCase());
    _value = state[entity][field]?.toLowerCase();
  }

  return {
    label: _label,
    value: _value
  }
}

export const FmtSimpleItemToValue = (state: any, field: string, entity: string) => {
  let _value: any;

  if (typeof (state[entity][field]) === 'object') {
    _value = state[entity][field]?.value?.toLowerCase();
  } else {
    _value = state[entity][field]?.toLowerCase();
  }
  return _value;
}

export const FmtFormToPayload = (payload: IOnboarding): IOnboarding => {
  const fmted = {
    id: payload?.id,
    type: payload?.type,
    personal: {
      ...payload?.personal,
      buildingNo: payload?.personal ? FmtSimpleItemToValue(payload, 'buildingNo', 'personal') : null,
      unitNo: payload?.personal ? FmtSimpleItemToValue(payload, 'unitNo', 'personal') : null,
      parkingSlot: payload?.personal ? FmtSimpleItemToValue(payload, 'parkingSlot', 'personal') : null,
      gender: payload?.personal ? FmtSimpleItemToValue(payload, 'gender', 'personal') : null,
      idType: payload?.personal ? FmtSimpleItemToValue(payload, 'idType', 'personal') : null,
      civilStatus: payload?.personal ? FmtSimpleItemToValue(payload, 'civilStatus', 'personal') : null,
      occupantType: payload?.personal ? FmtSimpleItemToValue(payload, 'occupantType', 'personal') : null
    },
    spouse: {
      ...payload?.spouse,
      gender: payload?.spouse ? FmtSimpleItemToValue(payload, 'gender', 'spouse') : null,
      idType: payload?.spouse ? FmtSimpleItemToValue(payload, 'idType', 'spouse') : null,
      civilStatus: payload?.spouse ? FmtSimpleItemToValue(payload, 'civilStatus', 'spouse') : null,
      occupantType: payload?.spouse ? FmtSimpleItemToValue(payload, 'occupantType', 'spouse') : null
    },
    occupants: payload?.occupants,
    vehicles: payload?.vehicles,
    documents: payload?.documents,
    documentsToUpload: payload?.documentsToUpload
  }

  return fmted;
}

export const FmtPayloadToForm = (payload: IOnboarding): IOnboarding => {
  const fmted = {
    id: payload?.id,
    type: payload?.type,
    personal: {
      ...payload?.personal,
      buildingNo: payload?.personal ? FmtToSimpleItem(payload, 'buildingNo', 'personal') : null,
      unitNo: payload?.personal ? FmtToSimpleItem(payload, 'unitNo', 'personal') : null,
      parkingSlot: payload?.personal ? FmtToSimpleItem(payload, 'parkingSlot', 'personal') : null,
      gender: payload?.personal ? FmtToSimpleItem(payload, 'gender', 'personal') : null,
      idType: payload?.personal ? FmtToSimpleItem(payload, 'idType', 'personal') : null,
      civilStatus: payload?.personal ? FmtToSimpleItem(payload, 'civilStatus', 'personal') : null,
      occupantType: payload?.personal ? FmtToSimpleItem(payload, 'occupantType', 'personal') : null
    },
    spouse: {
      ...payload?.spouse,
      gender: payload?.spouse ? FmtToSimpleItem(payload, 'gender', 'spouse') : null,
      idType: payload?.spouse ? FmtToSimpleItem(payload, 'idType', 'spouse') : null,
      civilStatus: payload?.spouse ? FmtToSimpleItem(payload, 'civilStatus', 'spouse') : null,
      occupantType: payload?.spouse ? FmtToSimpleItem(payload, 'occupantType', 'spouse') : null
    },
    occupants: payload?.occupants,
    vehicles: payload?.vehicles,
    documents: payload?.documents,
    documentsToUpload: payload?.documentsToUpload
  }
  return fmted;
}