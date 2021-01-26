export function get(sheet: BaseEntitySheet<{}, Entity<{}>>) {
  if (!PopoutModule) {
    return null
  }

  return PopoutModule.singleton.poppedOut.get(sheet.appId) ?? null
}
