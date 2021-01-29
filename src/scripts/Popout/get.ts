import {Sheet} from '../Sheet'
import {isActive} from './isActive'

export function get(sheet: Sheet): PopoutState | null {
  if (!isActive()) {
    return null
  }

  return globalThis.PopoutModule.singleton.poppedOut.get(sheet.appId) ?? null
}
