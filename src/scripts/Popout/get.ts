import {Sheet} from '../Sheet'

export function get(sheet: Sheet): PopoutModule.PopoutState | null {
  if (PopoutModule === undefined) {
    return null
  }

  return PopoutModule.singleton.poppedOut.get(sheet.appId) ?? null
}
