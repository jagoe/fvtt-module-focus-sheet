import {MODULE_KEY, SETTING_AUTO_OPEN, SETTING_AUTO_OPEN_POPOUT} from '@src/Module/constants'

import {Settings} from '@src/Settings'
import {cast} from '@util/cast'
import {createSandbox} from 'sinon'
import {expect} from 'chai'

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
      getSettingStub.withArgs(MODULE_KEY, SETTING_AUTO_OPEN).returns(true)
      getSettingStub.withArgs(MODULE_KEY, SETTING_AUTO_OPEN_POPOUT).returns(false)

      const settings = Settings.GetInstance()
      settings.Reset()

      expect(settings.AutoOpen.Enabled).to.be.true
      expect(settings.AutoOpen.AsPopout).to.be.false
    })
  })
})
