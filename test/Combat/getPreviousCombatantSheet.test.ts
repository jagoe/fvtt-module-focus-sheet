import * as getCombatantSheet from '@src/Combat/getCombatantSheet'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@/@util/cast'
import {expect} from 'chai'
import {getPreviousCombatantSheet} from '@src/Combat'

export function getPreviousCombatantSheetTests(): void {
  describe('Get previous combatant sheet', () => {
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

    const noCombatantCases = [
      {title: 'not defined', combatants: undefined},
      {title: 'empty', combatants: []},
      {title: 'only one', combatants: [{}]},
    ]
    noCombatantCases.forEach((testCase) => {
      it(`should return null if there are no combatants: ${testCase.title}`, () => {
        const combat: Partial<Combat> = {combatants: testCase.combatants}

        const combatantSheet = getPreviousCombatantSheet(cast(combat))

        expect(combatantSheet).to.be.null
      })
    })

    it('should get the combatant sheet of the previous combatant', () => {
      const currentCombatant: Combatant = cast({})
      const previousCombatant: Combatant = cast({})
      getPreviousCombatantSheet(cast({combatant: currentCombatant, combatants: [previousCombatant, currentCombatant]}))

      expect(getSheetStub.calledWithExactly(previousCombatant)).to.be.true
    })

    it('should get the combatant sheet of the last combatant if it is the first turn', () => {
      const currentCombatant: Combatant = cast({})
      const previousCombatant: Combatant = cast({})
      getPreviousCombatantSheet(cast({combatant: currentCombatant, combatants: [currentCombatant, previousCombatant]}))

      expect(getSheetStub.calledWithExactly(previousCombatant)).to.be.true
    })
  })
}
