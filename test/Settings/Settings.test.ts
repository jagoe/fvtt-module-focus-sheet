import {MODULE_KEY, SETTINGS} from '@src/Module/constants'

import {Settings} from '@src/Settings'
import {cast} from '@util/cast'
import {createSandbox} from 'sinon'
import {expect} from 'chai'
import {registerSettingsTests} from './registerSettings.test'

describe('Settings', () => {
  const sandbox = createSandbox()
  const getSettingStub = sandbox.stub()

  before(() => {
    global.game = cast({
      settings: cast({
        get: getSettingStub,
      }),
    })
  })

  after(() => {
    sandbox.restore()
  })

  describe('Get instance', () => {
    it('should always return the same instance', () => {
      const instance1 = Settings.GetInstance()
      const instance2 = Settings.GetInstance()

      expect(instance1).to.equal(instance2)
    })
  })

  describe('Reset', () => {
    it('should use the correct module settings', () => {
      getSettingStub.withArgs(MODULE_KEY, SETTINGS.AUTO_OPEN).returns(true)
      getSettingStub.withArgs(MODULE_KEY, SETTINGS.AUTO_OPEN_POPOUT).returns(false)
      getSettingStub.withArgs(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_X).returns('1')
      getSettingStub.withArgs(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_Y).returns('')

      const settings = Settings.GetInstance()
      settings.Reset()

      expect(settings.AutoOpen.Enabled).to.be.true
      expect(settings.AutoOpen.AsPopout).to.be.false
      expect(settings.AutoOpen.Position.X).to.equal(1)
      expect(settings.AutoOpen.Position.Y).to.equal(undefined)
    })
  })

  registerSettingsTests()
})
