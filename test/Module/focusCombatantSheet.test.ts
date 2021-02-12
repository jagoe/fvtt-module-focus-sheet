import * as focus from '@src/Sheet/focus'
import * as getCurrentCombatantSheet from '@src/Combat/getCurrentCombatantSheet'
import * as isPC from '@src/Combatant/isPC'
import * as open from '@src/Sheet/open'
import * as playerHasPermissionToView from '@src/Sheet/playerHasPermissionToView'

import {DEFAULT_COMBAT, DEFAULT_SETTINGS, DEFAULT_SHEET} from '@util/fixtures'
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
    const COMBAT: Combat = DEFAULT_COMBAT()
    const SHEET: ActorSheet = cast({...DEFAULT_SHEET(), bringToTop: bringToTopSpy})

    before(() => {
      getSheetStub = sandbox.stub(getCurrentCombatantSheet, 'getCurrentCombatantSheet')
      getSettingsStub = sandbox.stub(Settings, 'GetInstance')
      permissionStub = sandbox.stub(playerHasPermissionToView, 'playerHasPermissionToView')
      focusStub = sandbox.stub(focus, 'focus')
      openStub = sandbox.stub(open, 'open')
    })

    beforeEach(() => {
      SETTINGS = DEFAULT_SETTINGS()

      getSettingsStub.returns(cast(SETTINGS))
      getSheetStub.returns(SHEET)
      permissionStub.returns(true)
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should return early if the combat has not started', async () => {
      await focusCombatantSheet(cast({...COMBAT, started: false}))

      expect(focusStub.called).to.be.false
    })

    it('should return early if there is no combatant', async () => {
      await focusCombatantSheet(cast({...COMBAT, combatant: undefined}))

      expect(focusStub.called).to.be.false
    })

    it('should return early if there is no combatant sheet', async () => {
      getSheetStub.returns(null)

      await focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should return early if the player has insufficient permission', async () => {
      permissionStub.returns(false)

      await focusCombatantSheet(COMBAT)

      expect(focusStub.called).to.be.false
    })

    it('should return early if the player has insufficient permission', async () => {
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

    describe('Setting: Ignore PC Sheets', () => {
      let isPCStub: SinonStub<[combatant: Combatant, pcActorTypes: string[]], boolean>

      before(() => {
        isPCStub = sandbox.stub(isPC, 'isPC')
      })

      describe('Active', () => {
        beforeEach(() => {
          SETTINGS.IgnorePcSheets.Enabled = true
        })

        it('should check if the current combatant actor is a PC using the settings', async () => {
          await focusCombatantSheet(COMBAT)

          expect(isPCStub.calledWithExactly(COMBAT.combatant, SETTINGS.IgnorePcSheets.ActorTypes))
        })

        it('should return early if the combatant is a PC', async () => {
          isPCStub.returns(true)
          await focusCombatantSheet(COMBAT)

          expect(focusStub.called).to.be.false
        })

        it('should close the combatant sheet if the combatant is an NPC', async () => {
          isPCStub.returns(false)
          await focusCombatantSheet(COMBAT)

          expect(focusStub.called).to.be.true
        })
      })

      describe('Inactive', () => {
        beforeEach(() => {
          SETTINGS.IgnorePcSheets.Enabled = false
        })

        it('should close the combatant sheet if the combatant is a PC', async () => {
          isPCStub.returns(true)
          await focusCombatantSheet(COMBAT)

          expect(focusStub.called).to.be.true
        })
      })
    })
  })
}
