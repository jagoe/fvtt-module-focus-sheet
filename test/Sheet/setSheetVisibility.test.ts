import * as getSheetElement from '@src/Sheet/getSheetElement'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@util'
import {expect} from 'chai'
import {setSheetVisibility} from '@src/Sheet/setSheetVisibility'

export function setSheetVisibilityTests(): void {
  describe('Set sheet visibility', () => {
    const sandbox = createSandbox()
    let getSheetElementStub: SinonStub<[ActorSheet], HTMLElement | null>

    const SHEET: ActorSheet = cast({})

    before(() => {
      getSheetElementStub = sandbox.stub(getSheetElement, 'getSheetElement')
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should silently return if the sheet does not have an HTML element', () => {
      getSheetElementStub.returns(null)

      setSheetVisibility(SHEET, true)

      // no assertion, since we expect nothing to happen
    })

    it('should set the sheet visibility to hidden', () => {
      const element: HTMLElement = cast({style: {visibility: ''}})
      getSheetElementStub.returns(element)

      setSheetVisibility(SHEET, false)

      expect(element.style.visibility).to.equal('hidden')
    })

    it('should set the sheet visibility to default (i.e. visible)', () => {
      const element: HTMLElement = cast({style: {visibility: 'hidden'}})
      getSheetElementStub.returns(element)

      setSheetVisibility(SHEET, true)

      expect(element.style.visibility).to.equal('')
    })
  })
}
