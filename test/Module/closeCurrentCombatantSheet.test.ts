import * as getCombatantSheet from '@src/Combat/getCombatantSheet'
import * as isPC from '@src/Combatant/isPC'

import { DEFAULT_COMBAT, DEFAULT_SETTINGS, DEFAULT_SHEET } from '@util/fixtures'
import { ModuleSettings, Settings } from '@src/Settings'
import { SinonStub, createSandbox } from 'sinon'

import { cast } from '@util/cast'
import { closeCurrentCombatantSheet } from '@src/Module'
import { expect } from 'chai'

export function closeCurrentCombatantSheetTests(): void {
  describe('Close current combatant sheet', () => {
    const sandbox = createSandbox()
    const closeStub: SinonStub<[sheet: ActorSheet], void> = sandbox.stub()
    let getSettingsStub: SinonStub<[], Settings>
    let getSheetStub: SinonStub<[combatant: Combatant], ActorSheet | null>

    let SETTINGS: ModuleSettings
    const COMBAT: Combat = DEFAULT_COMBAT()
    const SHEET: ActorSheet = cast({ ...DEFAULT_SHEET(), close: closeStub })

    before(() => {
      getSheetStub = sandbox.stub(getCombatantSheet, 'getCombatantSheet')
      getSettingsStub = sandbox.stub(Settings, 'GetInstance')
    })

    beforeEach(() => {
      SETTINGS = { ...DEFAULT_SETTINGS(), AutoClose: true }

      getSettingsStub.returns(cast(SETTINGS))
      getSheetStub.returns(SHEET)
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should return early if the combat has not started', async () => {
      await closeCurrentCombatantSheet(cast({ ...COMBAT, started: false }))

      expect(closeStub.called).to.be.false
    })

    it('should return early if there is no combatant', async () => {
      await closeCurrentCombatantSheet(cast({ ...COMBAT, combatant: undefined }))

      expect(closeStub.called).to.be.false
    })

    it('should return early if the "auto close" setting is disabled', async () => {
      SETTINGS.AutoClose = false

      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.false
    })

    it('should return early if there is no combatant sheet', async () => {
      getSheetStub.returns(null)

      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.false
    })

    it('should do nothing if the combatant sheet is alredy closed', async () => {
      const sheet: Partial<ActorSheet> = { ...SHEET, rendered: false }
      getSheetStub.returns(cast(sheet))

      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.false
    })

    it('should close the combatant sheet', async () => {
      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.true
    })

    describe('Setting: Ignore PC Sheets', () => {
      let isPCStub: SinonStub<[actor: Actor | null, pcActorTypes?: string[]], boolean>

      before(() => {
        isPCStub = sandbox.stub(isPC, 'isPC')
      })

      describe('Active', () => {
        beforeEach(() => {
          SETTINGS.IgnorePcSheets.Enabled = true
        })

        it('should check if the current combatant actor is a PC using the settings', async () => {
          await closeCurrentCombatantSheet(COMBAT)

          expect(isPCStub.calledWithExactly(COMBAT.combatant?.actor ?? null, SETTINGS.IgnorePcSheets.ActorTypes))
        })

        it('should return early if the combatant is a PC', async () => {
          isPCStub.returns(true)
          await closeCurrentCombatantSheet(COMBAT)

          expect(closeStub.called).to.be.false
        })

        it('should close the combatant sheet if the combatant is an NPC', async () => {
          isPCStub.returns(false)
          await closeCurrentCombatantSheet(COMBAT)

          expect(closeStub.called).to.be.true
        })
      })

      describe('Inactive', () => {
        beforeEach(() => {
          SETTINGS.IgnorePcSheets.Enabled = false
        })

        it('should close the combatant sheet if the combatant is a PC', async () => {
          isPCStub.returns(true)
          await closeCurrentCombatantSheet(COMBAT)

          expect(closeStub.called).to.be.true
        })
      })
    })
  })
}
