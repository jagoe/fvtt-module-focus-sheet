import * as focus from '@src/Sheet/focus'
import * as getCurrentCombatantSheet from '@src/Combat/getCurrentCombatantSheet'
import * as open from '@src/Sheet/open'
import * as playerHasPermissionToView from '@src/Sheet/playerHasPermissionToView'

import {ModuleSettings, Settings} from '@src/Settings'
import {SinonSpy, SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {focusCombatantSheet} from '@src/Module'

export function focusCombatSheetTests(): void {
  describe('Focus combatant sheet', () => {
    const sandbox = createSandbox()
    const bringToTopSpy: SinonSpy = sandbox.spy()
    let getSheetStub: SinonStub<[combat: Combat], ActorSheet | null>
    let getSettingsStub: SinonStub<[], Settings>
    let permissionStub: SinonStub<[sheet: ActorSheet], boolean>
    let focusStub: SinonStub<[sheet: ActorSheet], void>
    let openStub: SinonStub<[sheet: ActorSheet, settings: ModuleSettings['AutoOpen']], Promise<void>>

    let SETTINGS: ModuleSettings
    const COMBAT: Combat = cast({started: true})
    const SHEET: ActorSheet = cast({rendered: true, bringToTop: bringToTopSpy})

    before(() => {
      getSheetStub = sandbox.stub(getCurrentCombatantSheet, 'getCurrentCombatantSheet')
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
          Position: {},
        },
        AutoClose: false,
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

    it('should return early if the combat has not started', async () => {
      getSheetStub.returns(null)

      await focusCombatantSheet(cast({...COMBAT, started: false}))

      expect(focusStub.called).to.be.false
    })

    it('should return early if there is no combatant sheet', async () => {
      getSheetStub.returns(null)

      await focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should return early if the player has insufficient permission', async () => {
      getSheetStub.returns(SHEET)
      permissionStub.returns(false)

      await focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should return early if the player has insufficient permission', async () => {
      getSheetStub.returns(SHEET)
      permissionStub.returns(false)

      await focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should return early if the combatant sheet is not currently being rendered', async () => {
      getSheetStub.returns(cast({...SHEET, rendered: false}))

      await focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should focus the sheet', async () => {
      getSheetStub.returns(SHEET)

      await focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.true
    })

    describe('Setting: Auto open', () => {
      beforeEach(() => {
        SETTINGS.AutoOpen.Enabled = true
      })

      it('should open the sheet if it has not been rendered yet', async () => {
        getSheetStub.returns(cast({...SHEET, rendered: false}))

        await focusCombatantSheet(COMBAT)

        expect(openStub.called).to.be.true
        expect(openStub.lastCall.lastArg).to.eql(SETTINGS.AutoOpen)
      })
    })
  })
}
