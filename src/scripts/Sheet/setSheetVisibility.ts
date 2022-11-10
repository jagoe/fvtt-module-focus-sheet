import { getSheetElement } from './getSheetElement'

export function setSheetVisibility(sheet: ActorSheet, setVisible: boolean): void {
  const element = getSheetElement(sheet)
  if (!element) {
    return
  }

  element.style.visibility = setVisible ? '' : 'hidden'
}
