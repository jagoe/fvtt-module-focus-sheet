import {MODULE_KEY} from './constants'

export function isActive(): boolean {
  return game.modules.get(MODULE_KEY)?.active ?? false
}
