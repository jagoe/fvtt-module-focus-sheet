import {MODULE_KEY, SETTINGS} from '../Module/constants'

import {parseNumber} from '../@util'

export interface ModuleSettings {
  AutoOpen: {
    Enabled: boolean
    AsPopout: boolean
    Position: {
      X?: number
      Y?: number
    }
  }
  AutoClose: boolean
  IgnorePcSheets: {
    Enabled: boolean
    ActorTypes: string[]
  }
}

export class Settings implements ModuleSettings {
  private static instance: Settings

  public static GetInstance(): Settings {
    if (Settings.instance === undefined) {
      Settings.instance = new Settings()
    }

    return Settings.instance
  }

  private constructor() {
    this.Reset()
  }

  private autoOpen: ModuleSettings['AutoOpen']

  public get AutoOpen(): ModuleSettings['AutoOpen'] {
    return this.autoOpen
  }

  private autoClose: ModuleSettings['AutoClose']

  public get AutoClose(): ModuleSettings['AutoClose'] {
    return this.autoClose
  }

  private ignorePcSheets: ModuleSettings['IgnorePcSheets']

  public get IgnorePcSheets(): ModuleSettings['IgnorePcSheets'] {
    return this.ignorePcSheets
  }

  public Reset(): void {
    this.autoOpen = {
      Enabled: game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN),
      AsPopout: game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POPOUT),
      Position: {
        Y: parseNumber(game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_Y)),
        X: parseNumber(game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_X)),
      },
    }

    this.autoClose = game.settings.get(MODULE_KEY, SETTINGS.AUTO_CLOSE)
    this.ignorePcSheets = {
      Enabled: game.settings.get(MODULE_KEY, SETTINGS.IGNORE_PC_SHEETS),
      ActorTypes: (game.settings.get(MODULE_KEY, SETTINGS.PC_ACTOR_TYPES) as string)?.split(/\s+,\s+/g).map((s) => s.trim()) ?? [],
    }
  }
}
