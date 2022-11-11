import * as getSystemPcActorTypes from '@src/System/getSystemPcActorTypes'

import { MODULE_KEY, SETTINGS } from '@src/Module/constants'
import { Settings, registerSettings } from '@src/Settings'
import { SinonStub, createSandbox } from 'sinon'

import { cast } from '@util/cast'
import { expect } from 'chai'

export function registerSettingsTests(): void {
  describe('Register settings', () => {
    const sandbox = createSandbox()
    const settings: Record<string, Record<string, unknown>> = {}

    let getSystemPcActorTypesStub: SinonStub<[], string[]>

    before(() => {
      global.game = cast({
        settings: {
          register(module: string, key: string, data: Record<string, unknown>) {
            settings[`${module}.${key}`] = data
          },
        },
        i18n: {
          localize(str: string) {
            return str
          },
        },
      })

      getSystemPcActorTypesStub = sandbox.stub(getSystemPcActorTypes, 'getSystemPcActorTypes')
      getSystemPcActorTypesStub.returns([])

      registerSettings()
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it("should have registered the 'auto open' setting", () => {
      const setting = settings[`${MODULE_KEY}.${SETTINGS.AUTO_OPEN}`]
      delete setting.onChange // not relevant for this test

      expect(setting).to.eql({
        name: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN}.name`,
        hint: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN}.hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
      })
    })

    it("should have registered the 'auto close' setting", () => {
      const setting = settings[`${MODULE_KEY}.${SETTINGS.AUTO_CLOSE}`]
      delete setting.onChange // not relevant for this test

      expect(setting).to.eql({
        name: `${MODULE_KEY}.${SETTINGS.AUTO_CLOSE}.name`,
        hint: `${MODULE_KEY}.${SETTINGS.AUTO_CLOSE}.hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
      })
    })

    it("should have registered the 'ignore PC sheets' setting", () => {
      const setting = settings[`${MODULE_KEY}.${SETTINGS.IGNORE_PC_SHEETS}`]
      delete setting.onChange // not relevant for this test

      expect(setting).to.eql({
        name: `${MODULE_KEY}.${SETTINGS.IGNORE_PC_SHEETS}.name`,
        hint: `${MODULE_KEY}.${SETTINGS.IGNORE_PC_SHEETS}.hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
      })
    })

    it("should have registered the 'auto popup' setting", () => {
      const setting = settings[`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}`]
      delete setting.onChange // not relevant for this test

      expect(setting).to.eql({
        name: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.name`,
        hint: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
      })
    })

    it("should have registered the 'auto open position' settings", () => {
      const settingX = settings[`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}`]
      delete settingX.onChange // not relevant for this test
      const settingY = settings[`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}`]
      delete settingY.onChange // not relevant for this test

      expect(settingY).to.eql({
        name: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.name`,
        hint: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.hint`,
        scope: 'client',
        config: true,
        default: '',
        type: String,
      })
      expect(settingX).to.eql({
        name: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.name`,
        hint: `${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.hint`,
        scope: 'client',
        config: true,
        default: '',
        type: String,
      })
    })

    it('should reset setting values on change', () => {
      const resetStub = sandbox.stub(Settings.prototype, 'Reset')
      const value = 'test'

      getSystemPcActorTypesStub.returns([])
      registerSettings()

      const registeredSettings = Object.values(settings)
      for (const setting of registeredSettings) {
        const onChange = setting.onChange as (value: unknown) => void
        onChange(value)
      }

      expect(resetStub.callCount).to.equal(registeredSettings.length)
    })
  })
}
