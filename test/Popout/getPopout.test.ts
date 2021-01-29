import * as isActive from '@src/Popout/isActive'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {getPopout} from '@src/Popout'

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
    const POPOUT: PopoutState = cast({})

    beforeEach(() => {
      global.PopoutModule = POPOUT_MODULE
      POPPED_OUT_SHEETS.set(SHEET.appId, POPOUT)
    })

    it('should return null if the Popout! module is not active', () => {
      isActiveStub.returns(false)

      const popout = getPopout(SHEET)

      expect(popout).to.be.null
    })

    it('should return null if the sheet is not popped out', () => {
      POPPED_OUT_SHEETS.delete(SHEET.appId)
      const popout = getPopout(SHEET)

      expect(popout).to.be.null
    })

    it('should return the popout state of a popped out sheet', () => {
      const popout = getPopout(SHEET)

      expect(popout).to.eql(POPOUT)
    })
  })
})
