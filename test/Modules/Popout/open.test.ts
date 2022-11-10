import * as getPopout from '@src/Modules/Popout/getPopout'
import * as getSheetElement from '@src/Sheet/getSheetElement'
import * as isFullyOpaque from '@src/Sheet/isFullyOpaque'
import * as setPosition from '@src/Modules/Popout/setPosition'
import * as setSheetVisibility from '@src/Sheet/setSheetVisibility'
import * as waitFor from '@src/@util/waitFor'

import { SinonStub, createSandbox } from 'sinon'

import { ModuleSettings } from '@src/Settings'
import { cast } from '@util/cast'
import { expect } from 'chai'
import { open } from '@src/Modules/Popout'

export function openTests(): void {
  describe('Open', () => {
    const sandbox = createSandbox()

    const popoutStub = sandbox.stub()
    const onStub: SinonStub = sandbox.stub()
    let setPositionStub: SinonStub<[popout: PopoutModule.PopoutState, position: ModuleSettings['AutoOpen']['Position']], void>
    let getPopoutStub: SinonStub<[sheet: ActorSheet], PopoutModule.PopoutState | null>
    let getSheetElementStub: SinonStub<[sheet: ActorSheet], HTMLElement | null>
    let setVisibilityStub: SinonStub<[sheet: ActorSheet, setVisible: boolean], void>
    let isFullyOpaqueStub: SinonStub<[sheet: ActorSheet], boolean>
    let waitForStub: SinonStub

    const POPOUT_MODULE_ID = 'popout'
    const SHEET_APP_ID = 'x33'
    const SHEET: ActorSheet = cast({
      appId: SHEET_APP_ID,
      actor: { name: 'Rincewind the Wizzard' }
    })
    const POPOUT: PopoutModule.PopoutState = cast({})

    before(() => {
      global.Hooks = { on: onStub }
      global.PopoutModule = cast({ popoutApp: popoutStub, singleton: { ID: POPOUT_MODULE_ID } })
      getPopoutStub = sandbox.stub(getPopout, 'getPopout')
      getSheetElementStub = sandbox.stub(getSheetElement, 'getSheetElement')
      isFullyOpaqueStub = sandbox.stub(isFullyOpaque, 'isFullyOpaque')
      setPositionStub = sandbox.stub(setPosition, 'setPosition')
      setVisibilityStub = sandbox.stub(setSheetVisibility, 'setSheetVisibility')
      waitForStub = sandbox.stub(waitFor, 'waitFor')
    })

    beforeEach(() => {
      getPopoutStub.returns(POPOUT)
      waitForStub.callsFake(async (condition) => {
        condition()

        return true
      })
    })

    afterEach(() => {
      sandbox.reset()
    })

    after(() => {
      sandbox.restore()
    })

    it('should wait for the sheet have an HTML element before hiding it', async () => {
      const sheet = { ...SHEET }
      await open(cast(sheet), {})

      expect(getSheetElementStub.withArgs(cast(sheet)).calledBefore(setVisibilityStub))
    })

    it('should hide the sheet before it gets rendered', async () => {
      const sheet = { ...SHEET }
      await open(cast(sheet), {})

      expect(setVisibilityStub.withArgs(cast(sheet), false).calledBefore(waitForStub))
    })

    it('should wait for the sheet to become fully opaque', async () => {
      await open(cast(SHEET), {})

      expect(isFullyOpaqueStub.calledOnce).to.be.true
    })

    it('should open the popout for the correct sheet', async () => {
      await open(SHEET, {})

      expect(popoutStub.calledOnceWithExactly(SHEET)).to.be.true
    })

    it('should not position the popout if no coordinates are given', async () => {
      await open(SHEET, {})

      expect(setPositionStub.called).to.be.false
    })

    it('should not position the popout if popout could not be retrieved', async () => {
      getPopoutStub.returns(null)
      await open(SHEET, { X: 0, Y: 0 })

      expect(setPositionStub.called).to.be.false
    })

    it('should position the popout if just the X coordinate is given', async () => {
      const coordinates = { X: 1 }
      await open(SHEET, coordinates)

      expect(setPositionStub.calledOnceWithExactly(POPOUT, coordinates)).to.be.true
    })

    it('should position the popout if just the Y coordinate is given', async () => {
      const coordinates = { Y: 1 }
      await open(SHEET, coordinates)

      expect(setPositionStub.calledOnceWithExactly(POPOUT, coordinates)).to.be.true
    })

    describe('Re-rendering the sheet', () => {
      const testCases = ['PopOut:popin', 'PopOut:close']
      testCases.forEach((event) => {
        describe(`Event "${event}"`, () => {
          it('should register re-rendering the sheet', async () => {
            await open(SHEET, {})

            expect(onStub.withArgs(event).calledOnce).to.be.true
          })

          it('should re-display the correct sheet', async () => {
            onStub.withArgs(event).callsFake((_event, cb) => cb(SHEET))

            await open(SHEET, {})

            expect(setVisibilityStub.withArgs(SHEET, true).calledOnce).to.be.true
          })

          it('should not re-display any other sheet', async () => {
            const otherSheet: ActorSheet = cast({ ...SHEET, appId: 'other' })
            onStub.withArgs(event).callsFake((_event, cb) => cb(otherSheet))

            await open(SHEET, {})

            expect(setVisibilityStub.withArgs(SHEET, true).called).to.be.false
            expect(setVisibilityStub.withArgs(otherSheet, true).called).to.be.false
          })
        })
      })
    })
  })
}
