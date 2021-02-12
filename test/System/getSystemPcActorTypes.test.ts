import {cast} from '@util'
import {expect} from 'chai'
import {getSystemPcActorTypes} from '@src/System'

export function getSystemPcActorTypesTests(): void {
  describe('Get PC Actor Types', () => {
    it('should return an empty list for an unknown system', () => {
      game = cast({system: {id: 'unknown'}})
      expect(getSystemPcActorTypes()).to.eql([])
    })

    const testCases = [{system: 'dnd5e', types: ['character']}]
    testCases.forEach((test) => {
      it(`should return the correct actor types for ${test.system}`, () => {
        game = cast({system: {id: test.system}})
        expect(getSystemPcActorTypes()).to.eql(test.types)
      })
    })
  })
}
