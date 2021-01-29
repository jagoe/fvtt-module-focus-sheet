export function isSheetOpen(sheet: Sheet | null): sheet is Sheet {
  return !!sheet && sheet.rendered
}
