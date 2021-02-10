import {ModuleSettings} from '@src/Settings'

export const DEFAULT_SETTINGS: () => ModuleSettings = () => ({
  AutoOpen: {
    AsPopout: false,
    Enabled: false,
    Position: {},
  },
  AutoClose: false,
  IgnorePcSheets: true,
})
