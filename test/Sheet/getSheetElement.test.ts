import {cast} from '@util'
import {expect} from 'chai'
import {getSheetElement} from '@src/Sheet/getSheetElement'

export function getSheetElementTests(): void {
  describe('Get sheet element', () => {
    it('should return null if the sheet does not have an HTML element', () => {
      const sheet: ActorSheet = cast({element: []})

      const element = getSheetElement(sheet)

      expect(element).to.be.null
    })

    it('should return null if the sheet element does not have a "style" property', () => {
      const sheet: ActorSheet = cast({element: [{}]})

      const element = getSheetElement(sheet)

      expect(element).to.be.null
    })

    it('should return the first HTML element of the sheet', () => {
      const expectedElement: HTMLElement = cast({style: {}})
      const sheet: ActorSheet = cast({element: [expectedElement]})

      const element = getSheetElement(sheet)

      expect(element).to.equal(expectedElement)
    })
  })
}
