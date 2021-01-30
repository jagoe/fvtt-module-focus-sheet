import {MODULE_KEY, SETTINGS} from '../scripts/Module/constants'

function i18n(...settings: string[]): string {
  return `${MODULE_KEY}.${settings.join('.')}`
}

export = {
  [i18n(SETTINGS.AUTO_OPEN, 'name')]: 'Automatically open sheet?',
  [i18n(SETTINGS.AUTO_OPEN, 'hint')]: "If enabled, a combatant's sheet will be opened at the start of their turn.",
  [i18n(SETTINGS.AUTO_OPEN_POPOUT, 'name')]: 'Automatically popout sheet?',
  [i18n(SETTINGS.AUTO_OPEN_POPOUT, 'hint')]:
    "If enabled, a combatant's sheet will be popped out at the start of their turn. " +
    "Has no effect if 'Automatically open sheet?' is disabled.",
  [i18n(SETTINGS.AUTO_OPEN_POSITION_TOP, 'name')]: 'Opening position - Y',
  [i18n(SETTINGS.AUTO_OPEN_POSITION_TOP, 'hint')]:
    'Determine where the sheet will open on the y-axis. Relative to the top left corner of the view port if popped-in, ' +
    'relative to the top left corner of the screen (or all screens) if popped-out. ' +
    "Has no effect if 'Automatically open sheet?' is disabled.",
  [i18n(SETTINGS.AUTO_OPEN_POSITION_LEFT, 'name')]: 'Opening position - X',
  [i18n(SETTINGS.AUTO_OPEN_POSITION_LEFT, 'hint')]:
    'Determine where the sheet will open on the x-axis. Relative to the top left corner of the view port if popped-in, ' +
    'relative to the top left corner of the screen (or all screens) if popped-out. ' +
    "Has no effect if 'Automatically open sheet?' is disabled.",
}
