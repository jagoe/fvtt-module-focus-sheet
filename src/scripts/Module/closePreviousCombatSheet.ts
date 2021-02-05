import {getPreviousCombatantSheet} from '../Combat'

export async function closePreviousCombatSheet(combat: Combat): Promise<void> {
  const previousSheet = getPreviousCombatantSheet(combat)
  if (!previousSheet) {
    // no sheet to close
    return
  }

  if (!previousSheet.rendered) {
    // sheet isn't being displayed, no need to close it
    return
  }

  await previousSheet.close()
}
