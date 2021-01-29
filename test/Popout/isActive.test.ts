import {isActive} from '@src/Popout'
import {MODULE_KEY} from '@src/Popout/constants'
import {expect} from 'chai'

describe('Popout', () => {
  describe('isActive', () => {
    const modules = new Map<string, {active: boolean}>()

    before(() => {
      global.game = ({modules} as unknown) as Game
    })

    beforeEach(() => {
      modules.clear()
    })

    it('returns false if the popout module is not present', () => {
      const result = isActive()

      expect(result).to.be.false
    })

    it('returns false if the popout module is not active', () => {
      modules.set(MODULE_KEY, {active: false})

      const result = isActive()

      expect(result).to.be.false
    })

    it('returns true if the popout module is active', () => {
      modules.set(MODULE_KEY, {active: true})

      const result = isActive()

      expect(result).to.be.true
    })
  })
})
