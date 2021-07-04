declare interface Combatant {
  actor?: Actor
}

declare interface CombatTurn {
  actor?: Actor
}

declare interface Combat {
  combatant: Combatant
  combatants: Combatant[]
  turns: CombatTurn[]
}
