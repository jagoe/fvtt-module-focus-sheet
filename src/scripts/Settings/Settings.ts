import {MODULE_KEY, SETTINGS} from '../Module/constants'

import {parseNumber} from '../@util/parseNumber'

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
  }
}
