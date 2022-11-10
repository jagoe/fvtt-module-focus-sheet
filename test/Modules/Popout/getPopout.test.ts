import * as isActive from '@src/Modules/isActive'

import { SinonStub, createSandbox } from 'sinon'

import { cast } from '@util/cast'
import { expect } from 'chai'
import { getPopout } from '@src/Modules/Popout'

export function getPopoutTests(): void {
  describe('Get popout', () => {
    const sandbox = createSandbox()
    let isActiveStub: SinonStub<[module: string], boolean>

    const POPPED_OUT_SHEETS: Map<number, PopoutModule.PopoutState> = new Map()
    const POPOUT_MODULE = { singleton: { poppedOut: POPPED_OUT_SHEETS } }
    const SHEET: ActorSheet = ({ appId: 1 } as unknown) as ActorSheet
    const POPOUT: PopoutModule.PopoutState = cast({})

    before(() => {
      isActiveStub = sandbox.stub(isActive, 'isActive')
    })

    beforeEach(() => {
      isActiveStub.returns(true)
      global.PopoutModule = cast(POPOUT_MODULE)
      POPPED_OUT_SHEETS.set(SHEET.appId, POPOUT)
    })

    after(() => {
      sandbox.restore()
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
}
