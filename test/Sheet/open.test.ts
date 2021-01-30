import * as openPopout from '@src/Modules/Popout/open'
import * as waitFor from '@src/@util/waitFor'

import {SinonStub, createSandbox} from 'sinon'

import {Settings} from '@src/Settings'
import {cast} from '@util/cast'
import {expect} from 'chai'
import {open} from '@src/Sheet'

describe('Sheet', () => {
  const sandbox = createSandbox()
  const renderStub = sandbox.stub()
  let openPopoutStub: SinonStub<[sheet: ActorSheet], void>
  let settingsStub: SinonStub<[], Settings>
  let waitForStub: SinonStub
  const setPositionStub = sandbox.stub()

  const SHEET: ActorSheet = cast({
    render: renderStub,
    actor: {name: 'Rincewind the Wizzard'},
    setPosition: setPositionStub,
  })
  let SETTINGS: Settings

  before(() => {
    openPopoutStub = sandbox.stub(openPopout, 'open')
    settingsStub = sandbox.stub(Settings, 'GetInstance')
    waitForStub = sandbox.stub(waitFor, 'waitFor')
  })

  beforeEach(() => {
    SETTINGS = cast({AutoOpen: {AsPopout: false, Position: {}}})
    settingsStub.returns(SETTINGS)
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
      await open(SHEET)

      expect(renderStub.called).to.be.true
    })

    it('should wait for the sheet to get rendered', async () => {
      const expectedConditionResult = 'test condition'
      let conditionResult = ''
      waitForStub.callsFake(async (condition) => {
        conditionResult = condition()
      })

      await open(cast({...SHEET, rendered: expectedConditionResult}))

      expect(conditionResult).to.equal('test condition')
    })

    it('should not popout the sheet if auto-open is disabled', async () => {
      SETTINGS.AutoOpen.AsPopout = false

      await open(SHEET)

      expect(openPopoutStub.called).to.be.false
    })

    it('should popout the sheet if auto-open is enabled', async () => {
      SETTINGS.AutoOpen.AsPopout = true

      await open(SHEET)

      expect(openPopoutStub.called).to.be.true
    })

    const positionTestCases = [
      {top: 0, left: 0},
      {top: 100, left: undefined},
      {top: undefined, left: -100},
      {top: undefined, left: undefined},
    ]
    positionTestCases.forEach((position) => {
      it(
        'should position a popped-in sheet according to the settings ' +
          `(x: ${position.left ?? '<undefined>'}| y: ${position.top ?? '<undefined>'})`,
        async () => {
          SETTINGS.AutoOpen.Position = {Top: position.top, Left: position.left}

          await open(SHEET)

          expect(setPositionStub.calledOnceWithExactly(position)).to.be.true
        },
      )
    })
  })
})
