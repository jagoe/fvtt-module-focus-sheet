import { MODULE_KEY, SETTINGS } from '../Module/constants'

import { Settings } from '../Settings'
import { getSystemPcActorTypes } from '../System'

function reloadSettings(): void {
  Settings.GetInstance().Reset()
}

export function registerSettings(): void {
  const gameGlobal = game as unknown as Game

  gameGlobal.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN, {
    name: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN}.name`),
    hint: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
    onChange: reloadSettings,
  })

  gameGlobal.settings.register(MODULE_KEY, SETTINGS.AUTO_CLOSE, {
    name: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_CLOSE}.name`),
    hint: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_CLOSE}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
    onChange: reloadSettings,
  })

  gameGlobal.settings.register(MODULE_KEY, SETTINGS.IGNORE_PC_SHEETS, {
    name: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.IGNORE_PC_SHEETS}.name`),
    hint: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.IGNORE_PC_SHEETS}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
    onChange: reloadSettings,
  })

  gameGlobal.settings.register(MODULE_KEY, SETTINGS.PC_ACTOR_TYPES, {
    name: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.PC_ACTOR_TYPES}.name`),
    hint: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.PC_ACTOR_TYPES}.hint`),
    scope: 'world',
    config: true,
    type: String,
    default: getSystemPcActorTypes().join(','),
    onChange: reloadSettings,
  })

  gameGlobal.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POPOUT, {
    name: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.name`),
    hint: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POPOUT}.hint`),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
    onChange: reloadSettings,
  })

  gameGlobal.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_X, {
    name: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.name`),
    hint: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_X}.hint`),
    scope: 'client',
    config: true,
    type: String,
    default: '',
    onChange: reloadSettings,
  })

  gameGlobal.settings.register(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_Y, {
    name: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.name`),
    hint: gameGlobal.i18n.localize(`${MODULE_KEY}.${SETTINGS.AUTO_OPEN_POSITION_Y}.hint`),
    scope: 'client',
    config: true,
    type: String,
    default: '',
    onChange: reloadSettings,
  })
}
