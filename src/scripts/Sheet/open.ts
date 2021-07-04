import {ModuleSettings} from '../Settings'
import {isFullyOpaque} from './isFullyOpaque'
import {open as openPopout} from '../Modules/Popout'
import {setSheetVisibility} from './setSheetVisibility'
import {waitFor} from '../@util'

export async function open(sheet: ActorSheet, settings: ModuleSettings['AutoOpen']): Promise<void> {
  sheet.render(true)

  if (settings.AsPopout) {
    // we hide and show to reduce flicker caused by first rendering the sheet and then replacing it with the popout
    setSheetVisibility(sheet, false)
    await waitFor(() => isFullyOpaque(sheet), {title: `Rendering sheet for ${sheet.actor.name}`})
    setSheetVisibility(sheet, true)

    openPopout(sheet, settings.Position)
  } else {
    await waitFor(() => sheet.rendered, {title: `Rendering sheet for ${sheet.actor.name}`})
    sheet.setPosition({left: settings.Position.X, top: settings.Position.Y})
  }
}
