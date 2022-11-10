import { focus as focusPopout, getPopout } from '../Modules/Popout'

export function focus(sheet: ActorSheet): void {
  const popout = getPopout(sheet)
  if (popout !== null) {
    focusPopout(popout)
  } else {
    sheet.bringToTop()
  }
}
