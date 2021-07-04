export function playerHasPermissionToView(sheet: ActorSheet): boolean {
  return sheet.actor.permission >= CONST.ENTITY_PERMISSIONS.OBSERVER
}
