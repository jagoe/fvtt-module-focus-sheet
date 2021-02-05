import {ModuleSettings} from '../../Settings'
import {getPopout} from './getPopout'
import {setPosition} from './setPosition'

export function open(sheet: ActorSheet, position: ModuleSettings['AutoOpen']['Position']): void {
  const popoutId = `popout_${PopoutModule.singleton.ID}_${sheet.appId}`
  PopoutModule.singleton.onPopoutClicked(popoutId, sheet)

  if (position.X !== undefined || position.Y !== undefined) {
    const popout = getPopout(sheet)

    if (popout) {
      setPosition(popout, position)
    }
  }
}
