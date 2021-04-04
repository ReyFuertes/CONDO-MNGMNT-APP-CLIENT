import { FormGroup } from "@angular/forms";

export const getFormObjectValue = (form: FormGroup, formName: string) => {
  return form.get(formName)?.value?.value
}