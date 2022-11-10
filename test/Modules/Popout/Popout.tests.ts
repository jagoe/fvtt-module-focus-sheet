import { focusTests } from './focus.test'
import { getPopoutTests } from './getPopout.test'
import { isActiveTests } from './isActive.test'
import { openTests } from './open.test'
import { setPositionTests } from './setPosition.test'

export function PopoutTests(): void {
  describe('PopOut!', () => {
    focusTests()
    getPopoutTests()
    isActiveTests()
    openTests()
    setPositionTests()
  })
}
