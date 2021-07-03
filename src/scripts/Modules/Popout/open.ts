import {ModuleSettings} from '../../Settings'
import {getPopout} from './getPopout'
import {setPosition} from './setPosition'

export function open(sheet: ActorSheet, position: ModuleSettings['AutoOpen']['Position']): void {
  PopoutModule.popoutApp(sheet)

  if (position.X !== undefined || position.Y !== undefined) {
    const popout = getPopout(sheet)

    if (popout) {
      setPosition(popout, position)
    }
  }
}
