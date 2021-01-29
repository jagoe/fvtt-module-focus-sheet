import {MODULE_KEY, SETTING_AUTO_OPEN, SETTING_AUTO_OPEN_POPOUT} from '@src/Module/constants'
import {Settings, registerSettings} from '@src/Settings'

import {cast} from '@util/cast'
import {createSandbox} from 'sinon'
import {expect} from 'chai'

describe('Module', () => {
  const sandbox = createSandbox()

  after(() => {
    sandbox.restore()
  })

  describe('Register settings', () => {
    const settings: Record<string, Record<string, unknown>> = {}

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
    })

    it("should register the 'auto open' setting", () => {
      registerSettings()

      const setting = settings[`${MODULE_KEY}.${SETTING_AUTO_OPEN}`]
      delete setting.onChange // not relevant for this test
      expect(setting).to.eql({
        name: `${MODULE_KEY}.${SETTING_AUTO_OPEN}.name`,
        hint: `${MODULE_KEY}.${SETTING_AUTO_OPEN}.hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
      })
    })

    it("should register the 'auto popup' setting", () => {
      registerSettings()

      const setting = settings[`${MODULE_KEY}.${SETTING_AUTO_OPEN_POPOUT}`]
      delete setting.onChange // not relevant for this test
      expect(setting).to.eql({
        name: `${MODULE_KEY}.${SETTING_AUTO_OPEN_POPOUT}.name`,
        hint: `${MODULE_KEY}.${SETTING_AUTO_OPEN_POPOUT}.hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
      })
    })

    it('should reset setting values on change', () => {
      const resetStub = sandbox.stub(Settings.prototype, 'Reset')
      const value = 'test'

      registerSettings()
      const registeredSettings = Object.values(settings)
      for (const setting of registeredSettings) {
        const onChange = setting.onChange as (value: unknown) => void
        onChange(value)
      }

      expect(resetStub.callCount).to.equal(registeredSettings.length + 1) // +1 b/c it gets called on registration as well
    })
  })
})
