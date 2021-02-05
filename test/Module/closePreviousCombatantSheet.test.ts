import * as getPreviousCombatantSheet from '@src/Combat/getPreviousCombatantSheet'

import {ModuleSettings, Settings} from '@src/Settings'
import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {closePreviousCombatantSheet} from '@src/Module'
import {expect} from 'chai'

export function closePreviousCombatantSheetTests(): void {
  describe('Close previous combatant sheet', () => {
    const sandbox = createSandbox()
    const closeStub: SinonStub<[sheet: ActorSheet], void> = sandbox.stub()
    let getSettingsStub: SinonStub<[], Settings>
    let getSheetStub: SinonStub<[combat: Combat], ActorSheet | null>

    let SETTINGS: ModuleSettings
    const SHEET: ActorSheet = cast({rendered: true, close: closeStub})

    before(() => {
      getSheetStub = sandbox.stub(getPreviousCombatantSheet, 'getPreviousCombatantSheet')
      getSettingsStub = sandbox.stub(Settings, 'GetInstance')
    })

    beforeEach(() => {
      SETTINGS = {
        AutoOpen: {
          AsPopout: false,
          Enabled: false,
          Position: {},
        },
        AutoClose: true,
      }

      getSettingsStub.returns(cast(SETTINGS))
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should do nothing if the "auto close" setting is disabled', async () => {
      SETTINGS.AutoClose = false

      await closePreviousCombatantSheet(cast({}))

      expect(closeStub.called).to.be.false
    })

    it('should do nothing if there is no previous combatant sheet', async () => {
      getSheetStub.returns(null)

      await closePreviousCombatantSheet(cast({}))

      expect(closeStub.called).to.be.false
    })

    it('should do nothing if the previous combatant sheet is alredy closed', async () => {
      const sheet: Partial<ActorSheet> = {...SHEET, rendered: false}
      getSheetStub.returns(cast(sheet))

      await closePreviousCombatantSheet(cast({}))

      expect(closeStub.called).to.be.false
    })

    it('should close the previous combatant sheet', async () => {
      getSheetStub.returns(SHEET)

      await closePreviousCombatantSheet(cast({}))

      expect(closeStub.called).to.be.true
    })
  })
}
