export function open(sheet: ActorSheet): void {
  const popoutId = `popout_${PopoutModule.singleton.ID}_${sheet.appId}`
  PopoutModule.singleton.onPopoutClicked(popoutId, sheet)
}
