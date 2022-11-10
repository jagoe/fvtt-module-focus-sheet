export function isPC(actor: Actor | null, pcActorTypes: string[] = []): boolean {
  if (actor === null) {
    return false
  }

  return pcActorTypes.includes(actor.type)
}
