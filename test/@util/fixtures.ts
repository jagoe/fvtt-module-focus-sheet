import {ModuleSettings} from '@src/Settings'
import {cast} from './cast'

export const DEFAULT_SETTINGS: () => ModuleSettings = () => ({
  AutoOpen: {
    AsPopout: false,
    Enabled: false,
    Position: {},
  },
  AutoClose: false,
  IgnorePcSheets: {
    Enabled: false,
    ActorTypes: [],
  },
})

export const DEFAULT_COMBAT: () => Combat = () => cast({started: true, combatant: {}})
export const DEFAULT_SHEET: () => ActorSheet = () => cast({rendered: true})
