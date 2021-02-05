import {Settings} from '../Settings'
import {getPreviousCombatantSheet} from '../Combat'

export async function closePreviousCombatantSheet(combat: Combat): Promise<void> {
  const settings = Settings.GetInstance()

  if (!settings.AutoClose) {
    return
  }

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
