import {cast} from '@util/cast'
import {createSandbox} from 'sinon'
import {expect} from 'chai'
import {waitFor} from '@src/@util/waitFor'

describe('Util', () => {
  const TIME = new Date(0)

  const sandbox = createSandbox()
  const timer = sandbox.useFakeTimers(TIME)

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('Wait for', () => {
    it('should resolve once the condition evaluates to true', async () => {
      let condition = false
      const promise = waitFor(() => condition)

      timer.tick(100)
      condition = true
      timer.tick(100)

      await promise

      // if there is no error, the test passed
    })

    it('should fail if the timeout triggers', async () => {
      try {
        const promise = waitFor(() => false, 100, 'test error')

        timer.tick(100)
        timer.tick(200)

        await promise
      } catch (error) {
        expect(cast<Error>(error).message).to.equal('Timout of 100 ms exceeded (test error)')
        return
      }

      throw new Error('Did not fail due to timeout')
    })
  })
})
