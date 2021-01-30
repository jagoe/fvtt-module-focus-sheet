import {focusTests} from './focus.test'
import {openTests} from './open.test'
import {playerHasPermissionToViewTests} from './playerHasPermissionToView.test'

describe('Sheet', () => {
  focusTests()
  openTests()
  playerHasPermissionToViewTests()
})
