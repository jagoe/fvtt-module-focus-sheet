export {}

declare global {
  namespace NodeJS {
    interface Global {
      Hooks: unknown
      PopoutModule: typeof PopoutModule | undefined
      game: Game
      CONST: typeof CONST
    }
  }
}
