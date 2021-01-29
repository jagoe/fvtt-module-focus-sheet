import * as focusPopout from '@src/Modules/Popout/focus'
import * as getPopout from '@src/Modules/Popout/getPopout'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {focus} from '@src/Sheet'

describe('Sheet', () => {
  const sandbox = createSandbox()
  let focusPopoutStub: SinonStub<[popout: PopoutModule.PopoutState], void>
  let getPopoutStub: SinonStub<[sheet: ActorSheet], PopoutModule.PopoutState | null>
  const bringToTopStub = sandbox.stub()

  const SHEET: ActorSheet = cast({bringToTop: bringToTopStub})

  before(() => {
    focusPopoutStub = sandbox.stub(focusPopout, 'focus')
    getPopoutStub = sandbox.stub(getPopout, 'getPopout')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('Focus', () => {
    it('should focus the popout if one exists', () => {
      getPopoutStub.returns(cast({}))

      focus(SHEET)

      expect(focusPopoutStub.called).to.be.true
      expect(bringToTopStub.called).to.be.false
    })

    it('should focus the sheet if no popout exists', () => {
      getPopoutStub.returns(null)

      focus(SHEET)

      expect(focusPopoutStub.called).to.be.false
      expect(bringToTopStub.called).to.be.true
    })
  })
})
