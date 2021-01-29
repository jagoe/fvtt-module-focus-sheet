import {MODULE_KEY, SETTING_AUTO_OPEN, SETTING_AUTO_OPEN_POPOUT} from '@src/Module/constants'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {registerSettings} from '@src/Settings'

describe('Module', () => {
  describe('register settings', () => {
    const settings: Record<string, unknown> = {}

    before(() => {
      global.game = cast({
        settings: {
          register(module: string, key: string, data: unknown) {
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
      expect(setting).to.eql({
        name: `${MODULE_KEY}.${SETTING_AUTO_OPEN_POPOUT}.name`,
        hint: `${MODULE_KEY}.${SETTING_AUTO_OPEN_POPOUT}.hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
      })
    })
  })
})
