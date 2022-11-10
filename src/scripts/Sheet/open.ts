import { ModuleSettings } from '../Settings'
import { open as openPopout } from '../Modules/Popout'
import { waitFor } from '../@util'

export async function open(sheet: ActorSheet, settings: ModuleSettings['AutoOpen']): Promise<void> {
  sheet.render(true)

  if (settings.AsPopout) {
    await openPopout(sheet, settings.Position)
  } else {
    await waitFor(() => sheet.rendered, { title: `Rendering sheet for ${sheet.actor.name ?? ''}` })
    sheet.setPosition({ left: settings.Position.X, top: settings.Position.Y })
  }
}
