import * as getCombatantSheet from '@src/Combat/getCombatantSheet'

import {ModuleSettings, Settings} from '@src/Settings'
import {SinonStub, createSandbox} from 'sinon'

import {DEFAULT_SETTINGS} from '@util/fixtures'
import {cast} from '@util/cast'
import {closeCurrentCombatantSheet} from '@src/Module'
import {expect} from 'chai'

export function closeCurrentCombatantSheetTests(): void {
  describe('Close current combatant sheet', () => {
    const sandbox = createSandbox()
    const closeStub: SinonStub<[sheet: ActorSheet], void> = sandbox.stub()
    let getSettingsStub: SinonStub<[], Settings>
    let getSheetStub: SinonStub<[combatant: Combatant], ActorSheet | null>

    let SETTINGS: ModuleSettings
    const COMBAT: Combat = cast({started: true, combatant: {}})
    const SHEET: ActorSheet = cast({rendered: true, close: closeStub})

    before(() => {
      getSheetStub = sandbox.stub(getCombatantSheet, 'getCombatantSheet')
      getSettingsStub = sandbox.stub(Settings, 'GetInstance')
    })

    beforeEach(() => {
      SETTINGS = {...DEFAULT_SETTINGS(), AutoClose: true}

      getSettingsStub.returns(cast(SETTINGS))
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should return early if the combat has not started', async () => {
      getSheetStub.returns(null)

      await closeCurrentCombatantSheet(cast({...COMBAT, started: false}))

      expect(closeStub.called).to.be.false
    })

    it('should do nothing if the "auto close" setting is disabled', async () => {
      SETTINGS.AutoClose = false

      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.false
    })

    it('should do nothing if there is not combatant', async () => {
      await closeCurrentCombatantSheet(cast({...COMBAT, combatant: undefined}))

      expect(closeStub.called).to.be.false
    })

    it('should do nothing if there is no combatant sheet', async () => {
      getSheetStub.returns(null)

      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.false
    })

    it('should do nothing if the combatant sheet is alredy closed', async () => {
      const sheet: Partial<ActorSheet> = {...SHEET, rendered: false}
      getSheetStub.returns(cast(sheet))

      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.false
    })

    it('should close the combatant sheet', async () => {
      getSheetStub.returns(SHEET)

      await closeCurrentCombatantSheet(COMBAT)

      expect(closeStub.called).to.be.true
    })
  })
}
