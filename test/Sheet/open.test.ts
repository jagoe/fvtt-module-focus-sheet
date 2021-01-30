import * as openPopout from '@src/Modules/Popout/open'
import * as waitFor from '@src/@util/waitFor'

import {SinonStub, createSandbox} from 'sinon'

import {ModuleSettings} from '@src/Settings'
import {cast} from '@util/cast'
import {expect} from 'chai'
import {open} from '@src/Sheet'

describe('Sheet', () => {
  const sandbox = createSandbox()
  const renderStub = sandbox.stub()
  let openPopoutStub: SinonStub<[sheet: ActorSheet, position: ModuleSettings['AutoOpen']['Position']], void>
  let waitForStub: SinonStub
  const setPositionStub = sandbox.stub()

  const SHEET: ActorSheet = cast({
    render: renderStub,
    actor: {name: 'Rincewind the Wizzard'},
    setPosition: setPositionStub,
  })
  const SETTINGS: ModuleSettings['AutoOpen'] = {Enabled: true, AsPopout: false, Position: {}}

  before(() => {
    openPopoutStub = sandbox.stub(openPopout, 'open')
    waitForStub = sandbox.stub(waitFor, 'waitFor')
  })

  beforeEach(() => {
    waitForStub.resolves()
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('Open', () => {
    it('should render the sheet', async () => {
      await open(SHEET, SETTINGS)

      expect(renderStub.called).to.be.true
    })

    it('should wait for the sheet to get rendered', async () => {
      const expectedConditionResult = 'test condition'
      let conditionResult = ''
      waitForStub.callsFake(async (condition) => {
        conditionResult = condition()
      })

      await open(cast({...SHEET, rendered: expectedConditionResult}), SETTINGS)

      expect(conditionResult).to.equal('test condition')
    })

    it('should not popout the sheet if auto-open is disabled', async () => {
      await open(SHEET, SETTINGS)

      expect(openPopoutStub.called).to.be.false
    })

    it('should popout the sheet if auto-open is enabled', async () => {
      await open(SHEET, {...SETTINGS, AsPopout: true})

      expect(openPopoutStub.called).to.be.true
      expect(openPopoutStub.lastCall.firstArg).to.eql(SHEET)
      expect(openPopoutStub.lastCall.lastArg).to.eql(SETTINGS.Position)
    })

    const positionTestCases = [
      {x: 0, y: 0},
      {x: undefined, y: 100},
      {x: -100, y: undefined},
      {x: undefined, y: undefined},
    ]
    positionTestCases.forEach((position) => {
      it(
        'should position a popped-in sheet according to the settings ' +
          `(x: ${position.x ?? '<undefined>'}| y: ${position.y ?? '<undefined>'})`,
        async () => {
          await open(SHEET, {...SETTINGS, Position: {X: position.x, Y: position.y}})

          expect(setPositionStub.calledOnceWithExactly(position)).to.be.true
        },
      )
    })
  })
})
