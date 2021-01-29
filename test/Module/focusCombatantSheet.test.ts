import * as focus from '@src/Sheet/focus'
import * as getCombatantSheet from '@src/Combat/getCombatantSheet'
import * as open from '@src/Sheet/open'
import * as playerHasPermissionToView from '@src/Sheet/playerHasPermissionToView'

import {ModuleSettings, Settings} from '@src/Settings'
import {SinonSpy, SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {focusCombatantSheet} from '@src/Module'

describe('Module', () => {
  describe('Focus combatant sheet', () => {
    const sandbox = createSandbox()
    const bringToTopSpy: SinonSpy = sandbox.spy()
    let getSheetStub: SinonStub<[combat: Combat], ActorSheet | null>
    let getSettingsStub: SinonStub<[], Settings>
    let permissionStub: SinonStub<[sheet: ActorSheet], boolean>
    let focusStub: SinonStub<[sheet: ActorSheet], void>
    let openStub: SinonStub<[sheet: ActorSheet], Promise<void>>

    let SETTINGS: ModuleSettings
    const COMBAT: Combat = cast({})
    const SHEET: ActorSheet = cast({rendered: true, bringToTop: bringToTopSpy})

    before(() => {
      getSheetStub = sandbox.stub(getCombatantSheet, 'getCombatantSheet')
      getSettingsStub = sandbox.stub(Settings, 'GetInstance')
      permissionStub = sandbox.stub(playerHasPermissionToView, 'playerHasPermissionToView')
      focusStub = sandbox.stub(focus, 'focus')
      openStub = sandbox.stub(open, 'open')
    })

    beforeEach(() => {
      SETTINGS = {
        AutoOpen: {
          AsPopout: false,
          Enabled: false,
        },
      }

      getSettingsStub.returns(cast(SETTINGS))
      permissionStub.returns(true)
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

      expect(focusStub.called).to.be.false
    })

    it('should return early if the player has insufficient permission', () => {
      getSheetStub.returns(SHEET)
      permissionStub.returns(false)

      focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should return early if the player has insufficient permission', () => {
      getSheetStub.returns(SHEET)
      permissionStub.returns(false)

      focusCombatantSheet(COMBAT)

      expect(getPopoutStub.called).to.be.false
    })

    it('should return early if the combatant sheet is not currently being rendered', () => {
      getSheetStub.returns(cast({...SHEET, rendered: false}))

      focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should focus the sheet', () => {
      getSheetStub.returns(SHEET)

      focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.true
    })

    describe('Settings', () => {
      describe('Auto open', () => {
        beforeEach(() => {
          SETTINGS.AutoOpen.Enabled = true
        })

        it('should open the sheet if it has not been rendered yet', () => {
          getSheetStub.returns(cast({...SHEET, rendered: false}))

          focusCombatantSheet(COMBAT)

          expect(openStub.called).to.be.true
        })
      })
    })

    describe('Settings', () => {
      describe('Auto open', () => {
        beforeEach(() => {
          SETTINGS.AutoOpen.Enabled = true
        })

        it('should render the sheet if it has not been rendered already', () => {
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
