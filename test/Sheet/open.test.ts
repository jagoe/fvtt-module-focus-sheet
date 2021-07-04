import * as isFullyOpaque from '@src/Sheet/isFullyOpaque'
import * as openPopout from '@src/Modules/Popout/open'
import * as setSheetVisibility from '@src/Sheet/setSheetVisibility'
import * as waitFor from '@src/@util/waitFor'

import {SinonStub, createSandbox} from 'sinon'

import {ModuleSettings} from '@src/Settings'
import {cast} from '@util/cast'
import {expect} from 'chai'
import {open} from '@src/Sheet'

export function openTests(): void {
  describe('Open', () => {
    const sandbox = createSandbox()
    const renderStub = sandbox.stub()
    let isFullyOpaqueStub: SinonStub<[sheet: ActorSheet], boolean>
    let openPopoutStub: SinonStub<[sheet: ActorSheet, position: ModuleSettings['AutoOpen']['Position']], void>
    let setVisibilityStub: SinonStub<[sheet: ActorSheet, setVisible: boolean], void>
    let waitForStub: SinonStub
    const setPositionStub = sandbox.stub()

    const SHEET: ActorSheet = cast({
      render: renderStub,
      actor: {name: 'Rincewind the Wizzard'},
      setPosition: setPositionStub,
    })
    const BASE_SETTINGS: ModuleSettings['AutoOpen'] = {Enabled: true, AsPopout: false, Position: {}}

    before(() => {
      isFullyOpaqueStub = sandbox.stub(isFullyOpaque, 'isFullyOpaque')
      openPopoutStub = sandbox.stub(openPopout, 'open')
      setVisibilityStub = sandbox.stub(setSheetVisibility, 'setSheetVisibility')
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

    it('should render the sheet', async () => {
      await open(SHEET, BASE_SETTINGS)

      expect(renderStub.called).to.be.true
    })

    describe('Open popped-in', () => {
      const SETTINGS = {...BASE_SETTINGS, AsPopout: false}

      it('should wait for the sheet to get rendered', async () => {
        const expectedConditionResult = true
        let conditionResult = ''
        waitForStub.callsFake(async (condition) => {
          conditionResult = condition()
        })
        await open(cast({...SHEET, rendered: true}), SETTINGS)

        expect(conditionResult).to.equal(expectedConditionResult)
      })

      it('should not popout the sheet', async () => {
        await open(SHEET, SETTINGS)

        expect(openPopoutStub.called).to.be.false
      })

      const positionTestCases = [
        {left: 0, top: 0},
        {left: undefined, top: 100},
        {left: -100, top: undefined},
        {left: undefined, top: undefined},
      ]
      positionTestCases.forEach((position) => {
        it(
          'should position the sheet according to the settings ' + `(x: ${position.left ?? '<undefined>'} | y: ${position.top ?? '<undefined>'})`,
          async () => {
            await open(SHEET, {...SETTINGS, Position: {X: position.left, Y: position.top}})

            expect(setPositionStub.calledOnceWithExactly(position)).to.be.true
          },
        )
      })
    })

    describe('Open popped-out', () => {
      const SETTINGS = {...BASE_SETTINGS, AsPopout: true}

      beforeEach(() => {
        waitForStub.callsFake(async (condition) => {
          condition()

          return true
        })
      })

      it('should wait for the sheet to become fully opaque', async () => {
        await open(cast(SHEET), SETTINGS)

        expect(isFullyOpaqueStub.calledOnce).to.be.true
      })

      it('should hide the sheet while waiting', async () => {
        const sheet = {...SHEET}
        await open(cast(sheet), SETTINGS)

        expect(setVisibilityStub.withArgs(cast(sheet), false).calledBefore(waitForStub))
      })

      it('should re-display the sheet after waiting', async () => {
        const sheet = {...SHEET}
        await open(cast(sheet), SETTINGS)

        expect(setVisibilityStub.withArgs(cast(sheet), true).calledAfter(waitForStub))
      })

      it('should popout the sheet if auto-open is enabled', async () => {
        await open(SHEET, SETTINGS)

        expect(openPopoutStub.called).to.be.true
        expect(openPopoutStub.lastCall.firstArg).to.eql(SHEET)
        expect(openPopoutStub.lastCall.lastArg).to.eql(SETTINGS.Position)
      })
    })
  })
}
