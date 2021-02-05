import {closePreviousCombatantSheetTests} from './closePreviousCombatantSheet.test'
import {focusCombatSheetTests} from './focusCombatantSheet.test'
import {initializeTests} from './initialize.test'

describe('Module', () => {
  initializeTests()
  focusCombatSheetTests()
  closePreviousCombatantSheetTests()
})
