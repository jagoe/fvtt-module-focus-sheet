import * as getCombatantSheet from '@src/Combat/getCombatantSheet'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@/@util/cast'
import {expect} from 'chai'
import {getPreviousCombatantSheet} from '@src/Combat'

export function getPreviousCombatantSheetTests(): void {
  describe('Get previous combatant sheet', () => {
    const sandbox = createSandbox()
    let getSheetStub: SinonStub<[combatant: Combatant], ActorSheet | null>

    const COMBAT: Partial<Combat> = {started: true}

    before(() => {
      getSheetStub = sandbox.stub(getCombatantSheet, 'getCombatantSheet')
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should return null if combat hasn not started', () => {
      const combat: Partial<Combat> = {...COMBAT, started: false}

      const combatantSheet = getPreviousCombatantSheet(cast(combat))

      expect(combatantSheet).to.be.null
    })

    const noTurnsCases = [
      {title: 'not defined', turns: undefined},
      {title: 'empty', turns: []},
      {title: 'only one', turns: [{}]},
    ]
    noTurnsCases.forEach((testCase) => {
      it(`should return null if there are not enough turns: ${testCase.title}`, () => {
        const combat: Partial<Combat> = {...COMBAT, turns: cast(testCase.turns)}

        const combatantSheet = getPreviousCombatantSheet(cast(combat))

        expect(combatantSheet).to.be.null
      })
    })

    it('should get the sheet of the previous combatant', () => {
      const currentTurn: CombatTurn = cast({})
      const previousTurn: CombatTurn = cast({})
      getPreviousCombatantSheet(cast({...COMBAT, turn: 1, turns: [previousTurn, currentTurn]}))

      expect(getSheetStub.calledWithExactly(previousTurn)).to.be.true
    })

    it('should get the sheet of the last combatant if it is the first turn', () => {
      const currentTurn: CombatTurn = cast({})
      const previousTurn: CombatTurn = cast({})
      getPreviousCombatantSheet(cast({...COMBAT, turn: 0, turns: [currentTurn, previousTurn]}))

      expect(getSheetStub.calledWithExactly(previousTurn)).to.be.true
    })
  })
}
