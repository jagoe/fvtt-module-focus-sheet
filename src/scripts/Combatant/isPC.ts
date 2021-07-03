export function isPC(actor?: Actor, pcActorTypes: string[] = []): boolean {
  if (actor === undefined) {
    return false
  }

  return pcActorTypes.includes(actor.data.type)
}
