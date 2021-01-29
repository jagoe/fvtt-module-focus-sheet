export {}

declare global {
  namespace NodeJS {
    interface Global {
      Hooks: unknown
      PopoutModule: typeof PopoutModule | undefined
      game: Game
      ENTITY_PERMISSIONS: Record<string, number>
    }
  }
}
