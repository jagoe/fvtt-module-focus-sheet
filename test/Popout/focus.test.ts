import {createSandbox} from 'sinon'
import {expect} from 'chai'
import {focus} from '@src/Modules/Popout'

describe('Modules: Poput', () => {
  const sandbox = createSandbox()

  after(() => {
    sandbox.restore()
  })

  describe('Focus', () => {
    it('should call the focus method of the popout window', () => {
      const spy = sandbox.spy()
      const popout: PopoutModule.PopoutState = {
        window: ({focus: spy} as unknown) as Window,
      }

      focus(popout)

      expect(spy.calledOnce).to.be.true
    })
  })
})
