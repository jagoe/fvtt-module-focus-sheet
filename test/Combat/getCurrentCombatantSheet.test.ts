import * as getCombatantSheet from '@src/Combat/getCombatantSheet'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@/@util/cast'
import {expect} from 'chai'
import {getCurrentCombatantSheet} from '@src/Combat'

export function getCurrentCombatantSheetTests(): void {
  describe('Get current combatant sheet', () => {
    const sandbox = createSandbox()
    let getSheetStub: SinonStub<[combatant: Combatant], ActorSheet | null>

    before(() => {
      getSheetStub = sandbox.stub(getCombatantSheet, 'getCombatantSheet')
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should return null if there is no active combatant', () => {
      const combat: Partial<Combat> = {combatant: undefined}

      const combatantSheet = getCurrentCombatantSheet(cast(combat))

      expect(combatantSheet).to.be.null
    })

    it('should get the combatant sheet of the current combatant', () => {
      const combatant: Combatant = cast({})
      getCurrentCombatantSheet(cast({combatant}))

      expect(getSheetStub.calledWithExactly(combatant)).to.be.true
    })
  })
}
