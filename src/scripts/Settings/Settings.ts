import {MODULE_KEY, SETTINGS} from '../Module/constants'

export interface ModuleSettings {
  AutoOpen: {
    Enabled: boolean
    AsPopout: boolean
    Position: {
      Top?: number
      Left?: number
    }
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

  public Reset(): void {
    this.autoOpen = {
      Enabled: game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN),
      AsPopout: game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POPOUT),
      Position: {
        Top: game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_TOP),
        Left: game.settings.get(MODULE_KEY, SETTINGS.AUTO_OPEN_POSITION_LEFT),
      },
    }
  }
}
