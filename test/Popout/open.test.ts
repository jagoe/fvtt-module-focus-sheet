import * as getPopout from '@src/Modules/Popout/getPopout'
import * as setPosition from '@src/Modules/Popout/setPosition'

import {SinonStub, createSandbox} from 'sinon'

import {ModuleSettings} from '@src/Settings'
import {cast} from '@util/cast'
import {expect} from 'chai'
import {open} from '@src/Modules/Popout'

describe('Modules: Popout', () => {
  const sandbox = createSandbox()

  const popoutStub = sandbox.stub()
  let setPositionStub: SinonStub<
    [popout: PopoutModule.PopoutState, position: ModuleSettings['AutoOpen']['Position']],
    void
  >
  let getPopoutStub: SinonStub<[sheet: ActorSheet], PopoutModule.PopoutState | null>

  const POPOUT_MODULE_ID = 'popout'
  const SHEET_APP_ID = 'x33'
  const SHEET: ActorSheet = cast({appId: SHEET_APP_ID})
  const POPOUT: PopoutModule.PopoutState = cast({})

  before(() => {
    global.PopoutModule = cast({singleton: {ID: POPOUT_MODULE_ID, onPopoutClicked: popoutStub}})
    getPopoutStub = sandbox.stub(getPopout, 'getPopout')
    setPositionStub = sandbox.stub(setPosition, 'setPosition')
  })

  beforeEach(() => {
    getPopoutStub.returns(POPOUT)
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('Open', () => {
    it('should open the popout for the correct sheet', () => {
      const expectedSheetId = `popout_${POPOUT_MODULE_ID}_${SHEET_APP_ID}`

      open(SHEET, {})

      expect(popoutStub.calledOnceWithExactly(expectedSheetId, SHEET)).to.be.true
    })

    it('should not position the popout if no coordinates are given', () => {
      open(SHEET, {})

      expect(setPositionStub.called).to.be.false
    })

    it('should not position the popout if popout could not be retrieved', () => {
      getPopoutStub.returns(null)
      open(SHEET, {})

      expect(setPositionStub.called).to.be.false
    })

    it('should position the popout if coordinates are given', () => {
      const coordinates = {X: 1, Y: -1}
      open(SHEET, coordinates)

      expect(setPositionStub.calledOnceWithExactly(POPOUT, coordinates)).to.be.true
    })
  })
})
