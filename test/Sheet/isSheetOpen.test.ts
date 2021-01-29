import {cast} from '@util/cast'
import {expect} from 'chai'
import {isSheetOpen} from '@src/Sheet/isSheetOpen'

describe('Sheet', () => {
  describe('is sheet open', () => {
    it('should return false if the sheet is null', () => {
      const result = isSheetOpen(null)

      expect(result).to.be.false
    })

    it('should return false if the sheet is not being rendered', () => {
      const result = isSheetOpen(cast({rendered: false}))

      expect(result).to.be.false
    })

    it('should return true if the sheet is being rendered', () => {
      const result = isSheetOpen(cast({rendered: true}))

      expect(result).to.be.true
    })
  })
})
