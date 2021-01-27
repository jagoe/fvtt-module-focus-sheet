import {Sheet} from '../Sheet'

export function get(sheet: Sheet) {
  if (!PopoutModule) {
    return null
  }

  return PopoutModule.singleton.poppedOut.get(sheet.appId) ?? null
}
