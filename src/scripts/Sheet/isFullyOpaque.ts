import {getSheetElement} from './getSheetElement'

export function isFullyOpaque(sheet: ActorSheet): boolean {
  const element = getSheetElement(sheet)
  if (!element) {
    return false
  }

  const opacity = element.style.opacity

  return opacity === '1' || opacity === ''
}
