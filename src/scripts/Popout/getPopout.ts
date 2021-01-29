import {isActive} from './isActive'

export function getPopout(sheet: Sheet): PopoutState | null {
  if (!isActive()) {
    return null
  }

  return globalThis.PopoutModule.singleton.poppedOut.get(sheet.appId) ?? null
}
