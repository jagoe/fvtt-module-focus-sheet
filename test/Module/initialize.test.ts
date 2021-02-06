import {SinonStub, createSandbox} from 'sinon'
import {closeCurrentCombatantSheet, closePreviousCombatantSheet, focusCombatantSheet, initialize} from '@src/Module'

import {expect} from 'chai'
import {registerSettings} from '@src/Settings'

export function initializeTests(): void {
  const sandbox = createSandbox()
  let onStub: SinonStub
  let onceStub: SinonStub
  let offStub: SinonStub

  before(() => {
    onStub = sandbox.stub()
    onceStub = sandbox.stub()
    offStub = sandbox.stub()
    global.Hooks = {on: onStub, once: onceStub, off: offStub}
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('Initialize', () => {
    it('should de-register existing hooks', () => {
      initialize()

      expect(offStub.calledWith('init', registerSettings)).to.be.true
      expect(offStub.calledWith('updateCombat', focusCombatantSheet)).to.be.true
      expect(offStub.calledWith('updateCombat', closePreviousCombatantSheet)).to.be.true
      expect(offStub.calledWith('deleteCombat', closeCurrentCombatantSheet)).to.be.true
    })

    it('should de-register existing hooks before registering them', () => {
      initialize()

      expect(offStub.withArgs('init').calledBefore(onceStub.withArgs('init'))).to.be.true
      expect(
        offStub
          .withArgs('updateCombat', focusCombatantSheet)
          .calledBefore(onStub.withArgs('updateCombat', focusCombatantSheet)),
      ).to.be.true
      expect(
        offStub
          .withArgs('updateCombat', closePreviousCombatantSheet)
          .calledBefore(onStub.withArgs('updateCombat', closePreviousCombatantSheet)),
      ).to.be.true
      expect(offStub.withArgs('deleteCombat').calledBefore(onStub.withArgs('deleteCombat'))).to.be.true
    })

    it('should register settings once on "init" event', () => {
      initialize()

      expect(onceStub.calledWithExactly('init', registerSettings)).to.be.true
    })

    it('should register "focusCombatantSheet" on "updateCombat" event', () => {
      initialize()

      expect(onStub.calledWithExactly('updateCombat', focusCombatantSheet)).to.be.true
    })

    it('should register "closePreviousCombatSheet" on "updateCombat" event', () => {
      initialize()

      expect(onStub.calledWithExactly('updateCombat', closePreviousCombatantSheet)).to.be.true
    })

    it('should register "closeCurrentCombatSheet" on "deleteCombat" event', () => {
      initialize()

      expect(onStub.calledWithExactly('deleteCombat', closeCurrentCombatantSheet)).to.be.true
    })
  })
}
