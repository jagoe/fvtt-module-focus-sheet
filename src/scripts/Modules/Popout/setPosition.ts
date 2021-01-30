import {ModuleSettings} from '../../Settings'

export function setPosition(popout: PopoutModule.PopoutState, position: ModuleSettings['AutoOpen']['Position']): void {
  const x = position.X !== undefined ? window.screenX + position.X : popout.window.screenX
  const y = position.Y !== undefined ? window.screenY + position.Y : popout.window.screenY

  popout.window.moveTo(x, y)
}
