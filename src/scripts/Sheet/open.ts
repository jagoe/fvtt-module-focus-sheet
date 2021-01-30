import {ModuleSettings} from '../Settings'
import {open as openPopout} from '../Modules/Popout'
import {waitFor} from '../@util/waitFor'

export async function open(sheet: ActorSheet, settings: ModuleSettings['AutoOpen']): Promise<void> {
  sheet.render(true)

  await waitFor(() => sheet.rendered, {title: `Rendering sheet for ${sheet.actor.name}`})

  if (settings.AsPopout) {
    openPopout(sheet, settings.Position)
  } else {
    sheet.setPosition({left: settings.Position.X, top: settings.Position.Y})
  }
}
