import * as focus from '@src/Modules/Popout/focus'
import * as getCombatantSheet from '@src/Combat/getCombatantSheet'
import * as getPopout from '@src/Modules/Popout/getPopout'

import {ModuleSettings, Settings} from '@src/Settings'
import {SinonSpy, SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {focusCombatantSheet} from '@src/Module'

describe('Module', () => {
  describe('Focus combatant sheet', () => {
    const sandbox = createSandbox()
    let getSheetStub: SinonStub<[combat: Combat], Sheet | null>
    let getPopoutStub: SinonStub<[sheet: Sheet], PopoutModule.PopoutState | null>
    let focusPopoutStub: SinonStub<[popout: PopoutModule.PopoutState], void>
    let getSettingsStub: SinonStub<[], Settings>
    const bringToTopSpy: SinonSpy = sandbox.spy()

    let SETTINGS: ModuleSettings
    const COMBAT: Combat = cast({})
    const SHEET: Sheet = cast({rendered: true, bringToTop: bringToTopSpy})
    const POPOUT: PopoutModule.PopoutState = cast({})

    before(() => {
      getSheetStub = sandbox.stub(getCombatantSheet, 'getCombatantSheet')
      getPopoutStub = sandbox.stub(getPopout, 'getPopout')
      focusPopoutStub = sandbox.stub(focus, 'focus')
      getSettingsStub = sandbox.stub(Settings, 'GetInstance')
    })

    beforeEach(() => {
      SETTINGS = {
        AutoOpen: {
          AsPopout: false,
          Enabled: false,
        },
      }

      getSettingsStub.returns(cast(SETTINGS))
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
      getSheetStub.returns(cast(SHEET))
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

    describe('Settings', () => {
      describe('Auto open', () => {
        beforeEach(() => {
          SETTINGS.AutoOpen.Enabled = true
        })

        it('should render the sheet if not rendered already', () => {
          const renderSpy = sandbox.spy()
          getSheetStub.returns(cast({...SHEET, rendered: false, render: renderSpy}))
          getPopoutStub.returns(null)

          focusCombatantSheet(COMBAT)

          expect(renderSpy.calledWith(true)).to.be.true
        })

        describe('As Popout', () => {
          beforeEach(() => {
            SETTINGS.AutoOpen.AsPopout = true
          })
        })
      })
    })
  })
})
