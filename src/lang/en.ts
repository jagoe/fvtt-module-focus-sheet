import {MODULE_KEY, SETTINGS} from '../scripts/Module/constants'

function i18n(...settings: string[]): string {
  return `${MODULE_KEY}.${settings.join('.')}`
}

export = {
  [i18n(SETTINGS.AUTO_OPEN, 'name')]: 'Automatically open sheet?',
  [i18n(SETTINGS.AUTO_OPEN, 'hint')]: "If enabled, a combatant's sheet will be opened at the start of their turn.",

  [i18n(SETTINGS.AUTO_CLOSE, 'name')]: 'Automatically close sheet at end of turn?',
  [i18n(SETTINGS.AUTO_CLOSE, 'hint')]: "If enabled, a combatant's sheet will be closed at the end of their turn.",

  [i18n(SETTINGS.IGNORE_PC_SHEETS, 'name')]: 'Ignore PC sheets?',
  [i18n(SETTINGS.IGNORE_PC_SHEETS, 'hint')]: 'If enabled, this module will completely ignore PC (player character) sheets.',

  [i18n(SETTINGS.PC_ACTOR_TYPES, 'name')]: 'PC sheet types',
  [i18n(SETTINGS.PC_ACTOR_TYPES, 'hint')]: `Here you can specify which actor sheet types are considered PC sheets.
For the following systems this is already configured: dnd5e.
Feel free to request more.`,

  [i18n(SETTINGS.AUTO_OPEN_POPOUT, 'name')]: 'Automatically popout sheet?',
  [i18n(SETTINGS.AUTO_OPEN_POPOUT, 'hint')]: `If enabled, a combatant's sheet will be popped out at the start of their turn.
Has no effect if 'Automatically open sheet?' is disabled.`,

  [i18n(SETTINGS.AUTO_OPEN_POSITION_X, 'name')]: 'Opening position - X',
  [i18n(SETTINGS.AUTO_OPEN_POSITION_X, 'hint')]:
    'Determine where the sheet will open on the x-axis relative to the top-left corner of the view port (popped-in) ' +
    `or main window (popped-out). Leaving it empty results in the sheet/window being opened at the default location.
  Caveat: some browsers prevent moving between screens.
  Has no effect if 'Automatically open sheet?' is disabled.`,

  [i18n(SETTINGS.AUTO_OPEN_POSITION_Y, 'name')]: 'Opening position - Y',
  [i18n(SETTINGS.AUTO_OPEN_POSITION_Y, 'hint')]:
    'Determine where the sheet will open on the y-axis relative to the top-left corner of the view port (popped-in) ' +
    `or main window (popped-out). Leaving it empty results in the sheet/window being opened at the default location.
Caveat: some browsers prevent moving between screens.
Has no effect if 'Automatically open sheet?' is disabled.`,
}
