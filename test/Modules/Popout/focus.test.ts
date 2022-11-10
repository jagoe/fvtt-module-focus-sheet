import { createSandbox } from 'sinon'
import { expect } from 'chai'
import { focus } from '@src/Modules/Popout'

export function focusTests(): void {
  describe('Focus', () => {
    const sandbox = createSandbox()

    after(() => {
      sandbox.restore()
    })

    it('should call the focus method of the popout window', () => {
      const spy = sandbox.spy()
      const popout: PopoutModule.PopoutState = {
        window: ({ focus: spy } as unknown) as Window,
      }

      focus(popout)

      expect(spy.calledOnce).to.be.true
    })
  })
}
