export const CamelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const FmtToSimpleItem = (state: any, field: string ) => {
  return {
    label: state?.personal[field],
    value: state?.personal[field]?.toLowerCase()
  }
}