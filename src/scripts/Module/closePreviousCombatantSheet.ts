import {Settings} from '../Settings'
import {getPreviousCombatantSheet} from '../Combat'
import {isPC} from '../Combatant'

export async function closePreviousCombatantSheet(combat: Combat): Promise<void> {
  if (!combat.started || combat.combatant === undefined) {
    // no active combat turn; nothing to do
    return
  }

  const settings = Settings.GetInstance()

  if (!settings.AutoClose) {
    return
  }

  if (settings.IgnorePcSheets.Enabled && isPC(combat.combatant, settings.IgnorePcSheets.ActorTypes)) {
    // PC sheets are ignored; nothing to do
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
