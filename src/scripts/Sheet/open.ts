import {ModuleSettings} from '../Settings'
import {open as openPopout} from '../Modules/Popout'
import {waitFor} from '../@util'

export async function open(sheet: ActorSheet, settings: ModuleSettings['AutoOpen']): Promise<void> {
  sheet.render(true)

  if (settings.AsPopout) {
    // we hide and show to reduce flicker caused by first rendering the sheet and then replacing it with the popout
    hideSheet(sheet)
    await waitFor(() => isFullyOpaque(sheet), {title: `Rendering sheet for ${sheet.actor.name}`})
    showSheet(sheet)

    openPopout(sheet, settings.Position)
  } else {
    await waitFor(() => sheet.rendered, {title: `Rendering sheet for ${sheet.actor.name}`})
    sheet.setPosition({left: settings.Position.X, top: settings.Position.Y})
  }
}

function hideSheet(sheet: ActorSheet): void {
  const element = getSheetElement(sheet)
  if (!element) {
    return
  }

  element.style.visibility = 'hidden'
}

function showSheet(sheet: ActorSheet): void {
  const element = getSheetElement(sheet)
  if (!element) {
    return
  }

  element.style.visibility = ''
}

function isFullyOpaque(sheet: ActorSheet): boolean {
  const element = getSheetElement(sheet)
  if (!element) {
    return false
  }

  const opacity = element.style.opacity

  return opacity === '1' || opacity === ''
}

function getSheetElement(sheet: ActorSheet): HTMLElement | null {
  const element = (sheet.element as unknown as HTMLElement[])[0]
  if (element === undefined || element.style === undefined) {
    return null
  }

  return element
}
