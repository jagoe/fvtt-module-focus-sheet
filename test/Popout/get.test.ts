import {createSandbox, SinonStub} from 'sinon'
import {expect} from 'chai'
import {get} from '@src/Popout'
import * as isActive from '@src/Popout/isActive'

describe('Popout', () => {
  const sandbox = createSandbox()
  let isActiveStub: SinonStub

  before(() => {
    isActiveStub = sandbox.stub(isActive, 'isActive')
  })

  beforeEach(() => {
    isActiveStub.returns(true)
  })

  after(() => {
    sandbox.restore()
  })

  describe('get', () => {
    const POPPED_OUT_SHEETS: Map<number, PopoutState> = new Map()
    const POPOUT_MODULE: PopoutModuleContainer = {singleton: {poppedOut: POPPED_OUT_SHEETS}}
    const SHEET: Sheet = ({appId: 1} as unknown) as Sheet
    const POPOUT: PopoutState = ({} as unknown) as PopoutState

    beforeEach(() => {
      global.PopoutModule = POPOUT_MODULE
      POPPED_OUT_SHEETS.set(SHEET.appId, POPOUT)
    })

    it('should return null if the Popout! module is not active', () => {
      isActiveStub.returns(false)

      const popout = get(SHEET)

      expect(popout).to.be.null
    })

    it('should return null if the sheet is not popped out', () => {
      POPPED_OUT_SHEETS.delete(SHEET.appId)
      const popout = get(SHEET)

      expect(popout).to.be.null
    })

    it('should return the popout state of a popped out sheet', () => {
      const popout = get(SHEET)

      expect(popout).to.eql(POPOUT)
    })
  })
})
