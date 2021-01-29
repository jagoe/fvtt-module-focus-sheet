import {SETTING_AUTO_OPEN, SETTING_AUTO_OPEN_POPOUT} from '../Popout/constants'

import {MODULE_KEY} from './constants'

export function registerSettings(): void {
  game.settings.register(MODULE_KEY, SETTING_AUTO_OPEN, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTING_AUTO_OPEN}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTING_AUTO_OPEN}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  })

  game.settings.register(MODULE_KEY, SETTING_AUTO_OPEN_POPOUT, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTING_AUTO_OPEN_POPOUT}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTING_AUTO_OPEN_POPOUT}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  })
}
