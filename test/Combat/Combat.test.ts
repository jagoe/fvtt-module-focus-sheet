import {getCombatantSheetTests} from './getCombatantSheet.test'
import {getCurrentCombatantSheetTests} from './getCurrentCombatantSheet.test'
import {getPreviousCombatantSheetTests} from './getPreviousCombatantSheet.test'

describe('Combat', () => {
  getCurrentCombatantSheetTests()
  getPreviousCombatantSheetTests()
  getCombatantSheetTests()
})
