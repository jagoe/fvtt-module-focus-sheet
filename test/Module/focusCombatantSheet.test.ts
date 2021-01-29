import * as focus from '@src/Popout/focus'
import * as getCombatantSheet from '@src/Combat/getCombatantSheet'
import * as getPopout from '@src/Popout/getPopout'

import {SinonSpy, SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {focusCombatantSheet} from '@src/Module'

describe('Module', () => {
  describe('focus combatant sheet', () => {
    const sandbox = createSandbox()
    let getSheetStub: SinonStub<[combat: Combat], Sheet | null>
    let getPopoutStub: SinonStub<[sheet: Sheet], PopoutState | null>
    let focusPopoutStub: SinonStub<[popout: PopoutState], void>
    const bringToTopSpy: SinonSpy<unknown[], void> = sandbox.spy()

    const COMBAT: Combat = cast({})
    const SHEET: Sheet = cast({rendered: true, bringToTop: bringToTopSpy})
    const POPOUT: PopoutState = cast({})

    before(() => {
      getSheetStub = sandbox.stub(getCombatantSheet, 'getCombatantSheet')
      getPopoutStub = sandbox.stub(getPopout, 'getPopout')
      focusPopoutStub = sandbox.stub(focus, 'focus')
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should return early if there is no combatant sheet', () => {
      getSheetStub.returns(null)

      focusCombatantSheet(COMBAT)

      expect(getPopoutStub.called).to.be.false
    })

    it('should return early if the combatant sheet is not currently being rendered', () => {
      getSheetStub.returns(cast({...SHEET, rendered: false}))

      focusCombatantSheet(COMBAT)

      expect(getPopoutStub.called).to.be.false
    })

    it('should focus the popout instead of the sheet if one exists', () => {
      getSheetStub.returns(SHEET)
      getPopoutStub.returns(POPOUT)

      focusCombatantSheet(COMBAT)

      expect(bringToTopSpy.called).to.be.false
      expect(focusPopoutStub.calledOnce).to.be.true
      expect(focusPopoutStub.calledWith(POPOUT)).to.be.true
    })

    it('should focus the sheet if no popout exists', () => {
      getSheetStub.returns(SHEET)
      getPopoutStub.returns(null)

      focusCombatantSheet(COMBAT)

      expect(focusPopoutStub.called).to.be.false
      expect(bringToTopSpy.calledOnce).to.be.true
    })
  })
})
