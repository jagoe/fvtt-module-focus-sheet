import {Settings} from '../Settings'
import {open as openPopout} from '../Modules/Popout'
import {waitFor} from '../@util/waitFor'

export async function open(sheet: ActorSheet): Promise<void> {
  sheet.render(true)

  await waitFor(() => sheet.rendered, {title: `Rendering sheet for ${sheet.actor.name}`})

  const settings = Settings.GetInstance()

  if (settings.AutoOpen.AsPopout) {
    openPopout(sheet)
  } else {
    sheet.setPosition({left: settings.AutoOpen.Position.Left, top: settings.AutoOpen.Position.Top})
  }
}
