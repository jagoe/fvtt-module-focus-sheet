import { cast } from '@util/cast'
import { expect } from 'chai'
import { playerHasPermissionToView } from '@src/Sheet'

export function playerHasPermissionToViewTests(): void {
  describe('Player has permission to view sheet', () => {
    enum DOCUMENT_PERMISSION_LEVELS {
      NONE = 0,
      LIMITED = 1,
      OBSERVER = 2,
      OWNER = 3,
    }

    before(() => {
      global.CONST = cast({ DOCUMENT_PERMISSION_LEVELS })
    })

    const insufficientLevels = [DOCUMENT_PERMISSION_LEVELS.NONE, DOCUMENT_PERMISSION_LEVELS.LIMITED]
    insufficientLevels.forEach((level) => {
      it(`should return false for permission below Observer: ${level}`, () => {
        const sheet: ActorSheet = cast({ actor: { permission: level } })

        const hasPermission = playerHasPermissionToView(sheet)

        expect(hasPermission).to.be.false
      })
    })

    const sufficientLevels = [DOCUMENT_PERMISSION_LEVELS.OBSERVER, DOCUMENT_PERMISSION_LEVELS.OWNER]
    sufficientLevels.forEach((level) => {
      it(`should return true for permission level at or above Observer: ${level}`, () => {
        const sheet: ActorSheet = cast({ actor: { permission: level } })

        const hasPermission = playerHasPermissionToView(sheet)

        expect(hasPermission).to.be.true
      })
    })
  })
}
