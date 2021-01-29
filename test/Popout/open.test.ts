import {cast} from '@util/cast'
import {createSandbox} from 'sinon'
import {expect} from 'chai'
import {open} from '@src/Modules/Popout'

describe('Modules: Popout', () => {
  const sandbox = createSandbox()

  const popoutStub = sandbox.stub()

  const POPOUT_MODULE_ID = 'popout'
  const SHEET_APP_ID = 'x33'
  const SHEET: ActorSheet = cast({appId: SHEET_APP_ID})

  before(() => {
    global.PopoutModule = cast({singleton: {ID: POPOUT_MODULE_ID, onPopoutClicked: popoutStub}})
  })

  after(() => {
    sandbox.restore()
  })

  describe('Open', () => {
    it('should open the popout for the correct sheet', () => {
      const expectedSheetId = `popout_${POPOUT_MODULE_ID}_${SHEET_APP_ID}`

      open(SHEET)

      expect(popoutStub.calledOnceWithExactly(expectedSheetId, SHEET)).to.be.true
    })
  })
})
