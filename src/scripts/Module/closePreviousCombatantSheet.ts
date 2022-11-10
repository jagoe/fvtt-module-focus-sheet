import { Settings } from '../Settings'
import { getPreviousCombatantSheet } from '../Combat'
import { isPC } from '../Combatant'

export async function closePreviousCombatantSheet(combat: Combat): Promise<void> {
  if (!combat.started) {
    // no active combat turn; nothing to do
    return
  }

  const previousCombatantSheet = await getPreviousCombatantSheet(combat)
  if (!previousCombatantSheet) {
    // no previous combatant; nothing to do
    return
  }

  const settings = Settings.GetInstance()

  if (!settings.AutoClose) {
    return
  }

  if (settings.IgnorePcSheets.Enabled && isPC(previousCombatantSheet.actor, settings.IgnorePcSheets.ActorTypes)) {
    // PC sheets are ignored; nothing to do
    return
  }

  if (!previousCombatantSheet.rendered) {
    // sheet isn't being displayed, no need to close it
    return
  }

  await previousCombatantSheet.close()
}
