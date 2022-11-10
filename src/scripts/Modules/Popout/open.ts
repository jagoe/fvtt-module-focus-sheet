import { getSheetElement, setSheetVisibility } from '../../Sheet'

import { ModuleSettings } from '../../Settings'
import { getPopout } from './getPopout'
import { isFullyOpaque } from '../../Sheet/isFullyOpaque'
import { setPosition } from './setPosition'
import { waitFor } from '../../@util'

export async function open(sheet: ActorSheet, position: ModuleSettings['AutoOpen']['Position']): Promise<void> {
  // hide the sheet to reduce flicker caused by first rendering the sheet and then replacing it with the popout
  await waitFor(() => getSheetElement(sheet) !== null, { title: `Rendering sheet for ${sheet.actor.name ?? ''}` })
  setSheetVisibility(sheet, false)
  await waitFor(() => isFullyOpaque(sheet), { title: `Rendering sheet for ${sheet.actor.name ?? ''}` })

  // popout the sheet
  PopoutModule.popoutApp(sheet)

  // set position
  if (position.X !== undefined || position.Y !== undefined) {
    const popout = getPopout(sheet)

    if (popout) {
      setPosition(popout, position)
    }
  }

  // re-render the sheet when the popout closes
  const rerenderSheet = (popoutSheet: ActorSheet): void => {
    if (popoutSheet.appId !== sheet.appId) {
      return
    }

    setSheetVisibility(sheet, true)
  }
  Hooks.on('PopOut:popin', rerenderSheet)
  Hooks.on('PopOut:close', rerenderSheet)
}
