import {cast} from '@util/cast'
import {expect} from 'chai'
import {playerHasPermissionToView} from '@src/Sheet'

export function playerHasPermissionToViewTests(): void {
  describe('Player has permission to view sheet', () => {
    enum ENTITY_PERMISSIONS {
      NONE = 0,
      LIMITED = 1,
      OBSERVER = 2,
      OWNER = 3,
    }

    before(() => {
      global.ENTITY_PERMISSIONS = cast(ENTITY_PERMISSIONS)
    })

    const insufficientLevels = [ENTITY_PERMISSIONS.NONE, ENTITY_PERMISSIONS.LIMITED]
    insufficientLevels.forEach((level) => {
      it(`should return false for permission below Observer: ${level}`, () => {
        const sheet: ActorSheet = cast({actor: {permission: level}})

        const hasPermission = playerHasPermissionToView(sheet)

        expect(hasPermission).to.be.false
      })
    })

    const sufficientLevels = [ENTITY_PERMISSIONS.OBSERVER, ENTITY_PERMISSIONS.OWNER]
    sufficientLevels.forEach((level) => {
      it(`should return true for permission level at or above Observer: ${level}`, () => {
        const sheet: ActorSheet = cast({actor: {permission: level}})

        const hasPermission = playerHasPermissionToView(sheet)

        expect(hasPermission).to.be.true
      })
    })
  })
}
