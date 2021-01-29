export {}

declare global {
  interface globalThis {
    PopoutModule: PopoutModuleContainer | undefined
  }
  namespace NodeJS {
    interface Global {
      Hooks: unknown
      PopoutModule: PopoutModuleContainer | undefined
    }
  }
}
