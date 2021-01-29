export {}

declare global {
  namespace NodeJS {
    interface Global {
      Hooks: unknown
      PopoutModule: PopoutModuleContainer | undefined
      game: Game
    }
  }
}
