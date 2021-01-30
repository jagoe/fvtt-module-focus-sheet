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

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_TOP, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_TOP}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_TOP}.hint`),
    scope: 'client',
    config: true,
    type: Number,
    default: undefined,
    onChange: updateSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_LEFT, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_LEFT}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_LEFT}.hint`),
    scope: 'client',
    config: true,
    type: Number,
    default: undefined,
    onChange: updateSettings,
  })
}
