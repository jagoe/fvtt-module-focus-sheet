import {expect} from 'chai'
import {isActive} from '@src/Modules'

export function isActiveTests(): void {
  describe('Is Active', () => {
    const modules = new Map<string, {active: boolean}>()
    const moduleKey = 'test-module'

    before(() => {
      global.game = ({modules} as unknown) as Game
    })

    beforeEach(() => {
      modules.clear()
    })

    it('returns false if the popout module is not present', () => {
      const result = isActive(moduleKey)

      expect(result).to.be.false
    })

    it('returns false if the popout module is not active', () => {
      modules.set(moduleKey, {active: false})

      const result = isActive(moduleKey)

      expect(result).to.be.false
    })

    it('returns true if the popout module is active', () => {
      modules.set(moduleKey, {active: true})

      const result = isActive(moduleKey)

      expect(result).to.be.true
    })
  })
}
