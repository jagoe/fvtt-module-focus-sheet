import {cast} from '@util/cast'
import {createSandbox} from 'sinon'
import {expect} from 'chai'
import {setPosition} from '@src/Modules/Popout'

describe('Modules: Popout', () => {
  const sandbox = createSandbox()

  const moveToStub = sandbox.stub()
  const POPOUT: PopoutModule.PopoutState = cast({window: {screenX: 500, screenY: 500, moveTo: moveToStub}})

  beforeEach(() => {
    global.window = cast({screenX: 0, screenY: 0})
  })

  describe('Set position', () => {
    it('should not change the x coordinate if it has not been provided', () => {
      const newCoordinates = {Y: 0}

      setPosition(POPOUT, newCoordinates)

      expect(moveToStub.calledWithExactly(500, 0))
    })

    it('should not change the y coordinate if it has not been provided', () => {
      const newCoordinates = {X: 0}

      setPosition(POPOUT, newCoordinates)

      expect(moveToStub.calledWithExactly(0, 500))
    })

    it('should change the coordinates relative to the coordinates of the main window', () => {
      const newCoordinates = {X: 100, Y: -100}
      global.window = cast({screenX: 500, screenY: 500})

      setPosition(POPOUT, newCoordinates)

      expect(moveToStub.calledWithExactly(600, 400))
    })
  })
})
