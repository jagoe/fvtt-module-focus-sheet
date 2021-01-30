import {MODULE_KEY, SETTINGS} from '../Module/constants'

import {Settings} from './Settings'

function updateSettings(): void {
  Settings.GetInstance().Reset()
}

export function registerSettings(): void {
  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
    onChange: updateSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POPOUT, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
    onChange: updateSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_X, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.hint`),
    scope: 'client',
    config: true,
    type: String,
    onChange: updateSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_Y, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.hint`),
    scope: 'client',
    config: true,
    type: String,
    onChange: updateSettings,
  })
}
