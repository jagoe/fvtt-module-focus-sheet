import {cast} from '@util'
import {expect} from 'chai'
import {isPC} from '@src/Combatant'

export function isPCTests(): void {
  describe('Is PC', () => {
    it('should return false if there is no actor', () => {
      const result = isPC(undefined)

      expect(result).to.be.false
    })

    it('should return false if the the provided list is empty', () => {
      const result = isPC(cast({data: {type: 'pc'}}), [])

      expect(result).to.be.false
    })

    it('should return false if the combatant actor type is not included in the provided list', () => {
      const result = isPC(cast({data: {type: 'pc'}}), ['character'])

      expect(result).to.be.false
    })

    it('should return true if the combatant actor type is included in the provided list', () => {
      const result = isPC(cast({data: {type: 'pc'}}), ['pc'])

      expect(result).to.be.true
    })
  })
}
