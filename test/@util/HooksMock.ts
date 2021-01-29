export const HooksMock = {
  _registeredEvents: {},

  on(event: string, handler: (...params: unknown[]) => void): void {
    if (!this._registeredEvents[event]) {
      this._registeredEvents[event] = [handler.name]
    } else {
      this._registeredEvents[event].push(handler.name)
    }
  },

  hasRegisteredEvent(event: string, handler: string): boolean {
    if (!this._registeredEvents[event]) {
      return false
    }

    return this._registeredEvents[event].some((h) => h === handler)
  },
}
