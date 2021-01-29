import {MODULE_KEY, SETTING_AUTO_OPEN, SETTING_AUTO_OPEN_POPOUT} from '../Module/constants'

export interface ModuleSettings {
  AutoOpen: {
    Enabled: boolean
    AsPopout: boolean
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
      Enabled: game.settings.get(MODULE_KEY, SETTING_AUTO_OPEN),
      AsPopout: game.settings.get(MODULE_KEY, SETTING_AUTO_OPEN_POPOUT),
    }
  }
}
