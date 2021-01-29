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

  const SHEET: ActorSheet = cast({render: renderStub})
  let SETTINGS: Settings

  before(() => {
    openPopoutStub = sandbox.stub(openPopout, 'open')
    settingsStub = sandbox.stub(Settings, 'GetInstance')
    sandbox.stub(waitFor, 'waitFor').resolves()
  })

  beforeEach(() => {
    SETTINGS = cast({AutoOpen: {AsPopout: true}})
    settingsStub.returns(SETTINGS)
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
  })
})
