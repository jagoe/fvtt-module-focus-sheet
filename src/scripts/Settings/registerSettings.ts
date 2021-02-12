import {MODULE_KEY, SETTINGS} from '../Module/constants'

import {Settings} from '../Settings'
import {getSystemPcActorTypes} from '../System'

function reloadSettings(): void {
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
    onChange: reloadSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_CLOSE, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_CLOSE}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_CLOSE}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
    onChange: reloadSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.IGNORE_PC_SHEETS, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.IGNORE_PC_SHEETS}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.IGNORE_PC_SHEETS}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
    onChange: reloadSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.PC_ACTOR_TYPES, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.PC_ACTOR_TYPES}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.PC_ACTOR_TYPES}.hint`),
    scope: 'world',
    config: true,
    type: String,
    default: getSystemPcActorTypes(),
    onChange: reloadSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POPOUT, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
    onChange: reloadSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_X, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.hint`),
    scope: 'client',
    config: true,
    type: String,
    onChange: reloadSettings,
  })

  game.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_Y, {
    name: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.name`),
    hint: game.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.hint`),
    scope: 'client',
    config: true,
    type: String,
    onChange: reloadSettings,
  })
}
