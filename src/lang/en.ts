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
  [i18n(SETTINGS.AUTO_OPEN_POSITION_X, 'name')]: 'Opening position - X',
  [i18n(SETTINGS.AUTO_OPEN_POSITION_X, 'hint')]:
    'Determine where the sheet will open on the x-axis. Relative to the top-left corner of the view port if popped-in, ' +
    'relative to the top-left corner of the main window if popped-out (caveat: some browsers prevent moving between screens). ' +
    "Has no effect if 'Automatically open sheet?' is disabled.",
  [i18n(SETTINGS.AUTO_OPEN_POSITION_Y, 'name')]: 'Opening position - Y',
  [i18n(SETTINGS.AUTO_OPEN_POSITION_Y, 'hint')]:
    'Determine where the sheet will open on the y-axis. Relative to the top-left corner of the view port if popped-in, ' +
    'relative to the top-left corner of the main window if popped-out (caveat: some browsers prevent moving between screens). ' +
    "Has no effect if 'Automatically open sheet?' is disabled.",
}
