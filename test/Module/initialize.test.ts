import {HooksMock} from '@/@util/HooksMock'
import {expect} from 'chai'
import {initialize} from '@src/Module'

describe('Module', () => {
  before(() => {
    global.Hooks = HooksMock
  })

  describe('Initialize', () => {
    it('should register "focusCombatantSheet" on "updateCombat" event', () => {
      initialize()

      const handler = HooksMock.getRegisteredEvent('updateCombat', 'focusCombatantSheet')
      expect(handler).not.to.be.null
      expect(handler?.type).to.equal('multi')
    })

    it('should register settings once on "init" event', () => {
      initialize()

      const handler = HooksMock.getRegisteredEvent('init', 'registerSettings')
      expect(handler).not.to.be.null
      expect(handler?.type).to.equal('single')
    })
  })
})
