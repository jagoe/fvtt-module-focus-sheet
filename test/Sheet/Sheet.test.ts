import { focusTests } from './focus.test'
import { getSheetElementTests } from './getSheetElement.test'
import { isFullyOpaqueTests } from './isFullyOpaque.test'
import { openTests } from './open.test'
import { playerHasPermissionToViewTests } from './playerHasPermissionToView.test'
import { setSheetVisibilityTests } from './setSheetVisibility.test'

describe('Sheet', () => {
  focusTests()
  getSheetElementTests()
  isFullyOpaqueTests()
  openTests()
  playerHasPermissionToViewTests()
  setSheetVisibilityTests()
})
