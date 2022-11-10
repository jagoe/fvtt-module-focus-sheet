import { MODULE_KEY, SETTINGS } from '../Module/constants'

import { parseNumber } from '../@util'

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
    const gameGlobal = game as unknown as Game

    this.autoOpen = {
      Enabled: gameGlobal.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN) as boolean,
      AsPopout: gameGlobal.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POPOUT) as boolean,
      Position: {
        Y: parseNumber(gameGlobal.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_Y) as string),
        X: parseNumber(gameGlobal.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_X) as string),
      },
    }

    this.autoClose = gameGlobal.settings.get(MODULE_KEY, SETTINGS.AUTO_CLOSE) as boolean
    this.ignorePcSheets = {
      Enabled: gameGlobal.settings.get(MODULE_KEY, SETTINGS.IGNORE_PC_SHEETS) as boolean,
      ActorTypes: (gameGlobal.settings.get(MODULE_KEY, SETTINGS.PC_ACTOR_TYPES) as string)?.split(/\s+,\s+/g).map((s) => s.trim()) ?? [],
    }
  }
}
