import * as isActive from '@src/Modules/isActive'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@util/cast'
import {expect} from 'chai'
import {getPopout} from '@src/Modules/Popout'

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

  describe('Get popout', () => {
    const POPPED_OUT_SHEETS: Map<number, PopoutModule.PopoutState> = new Map()
    const POPOUT_MODULE = {singleton: {poppedOut: POPPED_OUT_SHEETS}}
    const SHEET: Sheet = ({appId: 1} as unknown) as Sheet
    const POPOUT: PopoutModule.PopoutState = cast({})

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
