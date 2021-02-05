declare enum ENTITY_PERMISSIONS {
  NONE = 0,
  LIMITED = 1,
  OBSERVER = 2,
  OWNER = 3,
}

declare interface Combatant {
  actor: Actor
}

declare interface Combat {
  combatant: Combatant
  combatants: Combatant[]
}
