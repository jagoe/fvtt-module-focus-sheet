import * as getSheetElement from '@src/Sheet/getSheetElement'

import {SinonStub, createSandbox} from 'sinon'

import {cast} from '@util'
import {expect} from 'chai'
import {isFullyOpaque} from '@src/Sheet/isFullyOpaque'

export function isFullyOpaqueTests(): void {
  describe('Is fully opaque', () => {
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

    it('should return false if the sheet does not have an HTML element', () => {
      getSheetElementStub.returns(null)

      const isOpaque = isFullyOpaque(SHEET)

      expect(isOpaque).to.be.false
    })

    it('should return true if the sheet element has no opacity (defaulting to opaque)', () => {
      getSheetElementStub.returns(cast({style: {opacity: ''}}))

      const isOpaque = isFullyOpaque(SHEET)

      expect(isOpaque).to.be.true
    })

    it('should return true if the sheet element has opacity of "1"', () => {
      getSheetElementStub.returns(cast({style: {opacity: '1'}}))

      const isOpaque = isFullyOpaque(SHEET)

      expect(isOpaque).to.be.true
    })

    const testCases = ['0', '0.5', '-1', 'invalid']
    testCases.forEach((value) => {
      it(`should return false if the sheet element has opacity below 1 (${value})`, () => {
        getSheetElementStub.returns(cast({style: {opacity: value}}))

        const isOpaque = isFullyOpaque(SHEET)

        expect(isOpaque).to.be.false
      })
    })
  })
}
