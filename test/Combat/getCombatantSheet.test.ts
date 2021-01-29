import {getCombatantSheet} from '@src/Combat'
import {cast} from '@util/cast'
import {expect} from 'chai'

describe('Combat', () => {
  describe('Get combatant sheet', () => {
    it('should return null if there is no active combatant', () => {
      const combat: Partial<Combat> = {combatant: null}

      const combatantSheet = getCombatantSheet(cast(combat))

      expect(combatantSheet).to.be.null
    })

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
      const combat: Partial<Combat> = {combatant: {actor}}

      const combatantSheet = getCombatantSheet(cast(combat))

      expect(combatantSheet).not.to.be.null
      expect(combatantSheet!.id).to.equal(id)
    })
  })
})
