export class HooksMock {
  private static _registeredEvents: Record<string, Array<string>> = {}

  public static on(event: string, handler: Function): void {
    if (!this._registeredEvents[event]) {
      this._registeredEvents[event] = [handler.name]
    } else {
      this._registeredEvents[event].push(handler.name)
    }
  }

  public static hasRegisteredEvent(event: string, handler: string): boolean {
    if (!this._registeredEvents[event]) {
      return false
    }

    return this._registeredEvents[event].some((h) => h === handler)
  }
}
