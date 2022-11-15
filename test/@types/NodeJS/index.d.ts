declare interface FoundryGlobal extends Global {
  Hooks: unknown
  PopoutModule: typeof PopoutModule | undefined
  game: Game
  CONST: typeof CONST
}
