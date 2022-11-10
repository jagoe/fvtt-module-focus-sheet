export function playerHasPermissionToView(sheet: ActorSheet): boolean {
  return sheet.actor.permission >= CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER
}
