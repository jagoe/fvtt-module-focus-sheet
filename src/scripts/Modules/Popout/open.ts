import {ModuleSettings} from '../../Settings'

export function open(sheet: ActorSheet, position: ModuleSettings['AutoOpen']['Position']): void {
  const popoutId = `popout_${PopoutModule.singleton.ID}_${sheet.appId}`
  PopoutModule.singleton.onPopoutClicked(popoutId, sheet)
}
