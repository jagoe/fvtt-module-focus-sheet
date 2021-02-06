import {cast} from '@util/cast'
import {expect} from 'chai'
import {getCombatantSheet} from '@src/Combat'

export function getCombatantSheetTests(): void {
  describe('Get combatant sheet', () => {
    it('should return null if the active combatant does not have an actor', () => {
      const combat: Partial<Combat> = {combatant: {actor: null}}

      const combatantSheet = getCombatantSheet(cast(combat))

      expect(combatantSheet).to.be.null
    })

    it('should return null if the active combatant does not have an actor sheet', () => {
      const actor: Partial<Actor> = {sheet: undefined}
      const combat: Partial<Combat> = {combatant: {actor}}

      const combatantSheet = getCombatantSheet(cast(combat))

      expect(combatantSheet).to.be.null
    })

    it('should return active combatant actor sheet', () => {
      const id = '42'
      const sheet: Partial<ActorSheet> = {id}
      const actor: Partial<Actor> = {sheet: cast(sheet)}
      const combatant: Combatant = cast({actor})

      const combatantSheet = getCombatantSheet(combatant)

      expect(combatantSheet).not.to.be.null
      expect(combatantSheet!.id).to.equal(id)
    })
  })
}
