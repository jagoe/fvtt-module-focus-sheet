import {MODULE_KEY, SETTING_AUTO_OPEN, SETTING_AUTO_OPEN_POPOUT} from '../scripts/Module/constants'

function i18n(...settings: string[]): string {
  return `${MODULE_KEY}.${settings.join('.')}`
}

export = {
  [i18n(SETTING_AUTO_OPEN, 'name')]: 'Automatically open sheet?',
  [i18n(SETTING_AUTO_OPEN, 'hint')]: "If enabled, a combatant's sheet will be opened at the start of their turn.",
  [i18n(SETTING_AUTO_OPEN_POPOUT, 'name')]: 'Automatically popout sheet?',
  [i18n(SETTING_AUTO_OPEN_POPOUT, 'hint')]:
    "If enabled, a combatant's sheet will be popped out at the start of their turn. " +
    "Has no effect if 'Automatically open sheet?' is disabled.",
}
