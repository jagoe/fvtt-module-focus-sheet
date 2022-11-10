import * as initialize from '@src/Module/initialize'

import { SinonStub, createSandbox } from 'sinon'

import { expect } from 'chai'

describe('Bootstrap', () => {
  const sandbox = createSandbox()
  let initStub: SinonStub<[], void>

  before(() => {
    initStub = sandbox.stub(initialize, 'initialize')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  it('should initialize the module', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@src/module')

    expect(initStub.called).to.be.true
  })
})
