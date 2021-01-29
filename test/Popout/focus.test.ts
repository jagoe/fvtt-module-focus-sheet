import {createSandbox} from 'sinon'
import {focus} from '@src/Popout'
import {expect} from 'chai'

describe('Poput', () => {
  const sandbox = createSandbox()

  describe('focus', () => {
    it('should call the focus method of the popout window', () => {
      const spy = sandbox.spy()
      const popout: PopoutState = {
        window: ({focus: spy} as unknown) as Window,
      }

      focus(popout)

      expect(spy.calledOnce).to.be.true
    })
  })
})
