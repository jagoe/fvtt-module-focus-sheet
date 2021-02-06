import {Settings} from '../Settings'
import {getCombatantSheet} from '../Combat'

export async function closeCurrentCombatantSheet(combat: Combat): Promise<void> {
  if (!combat.started) {
    return
  }

  const settings = Settings.GetInstance()

  if (!settings.AutoClose) {
    return
  }

  if (combat.combatant === undefined) {
    // no combatant; nothing to do
    return
  }

  const sheet = getCombatantSheet(combat.combatant)
  if (!sheet) {
    // no sheet to close
    return
  }

  if (!sheet.rendered) {
    // sheet isn't being displayed, no need to close it
    return
  }

  await sheet.close()
}
