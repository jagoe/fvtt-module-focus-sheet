export function getSheetElement(sheet: ActorSheet): HTMLElement | null {
  const element = (sheet.element as unknown as HTMLElement[])[0]
  if (element === undefined || element.style === undefined) {
    return null
  }

  return element
}
