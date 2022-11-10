import { MODULE_KEY } from './constants'
import { isActive } from '../isActive'

export function getPopout(sheet: ActorSheet): PopoutModule.PopoutState | null {
  if (!isActive(MODULE_KEY)) {
    return null
  }

  return PopoutModule.singleton.poppedOut.get(sheet.appId) ?? null
}
