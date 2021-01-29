export {}

declare global {
  namespace NodeJS {
    interface Global {
      Hooks: unknown
    }
  }
}
