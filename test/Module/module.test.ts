import {expect} from 'chai'
import {initialize} from '@src/Module'
import {HooksMock} from '@/@util/HooksMock'

describe('Module', () => {
  before(() => {
    global.Hooks = HooksMock
  })

  describe('Initialize', () => {
    it('should register "focusCombatantSheet" on "updateCombat" event', () => {
      initialize()

      expect(HooksMock.hasRegisteredEvent('updateCombat', 'focusCombatantSheet')).to.be.true
    })
  })
})
