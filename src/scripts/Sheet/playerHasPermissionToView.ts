export function playerHasPermissionToView(sheet: ActorSheet): boolean {
  return sheet.actor.permission >= ENTITY_PERMISSIONS.OBSERVER
}
