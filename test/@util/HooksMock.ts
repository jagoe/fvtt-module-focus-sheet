export type EventType = 'single' | 'multi'
export interface Handler {
  name: string
  type: EventType
}

const _registeredEvents: Record<string, Handler[]> = {}

function hasEventHandlers(event: string): boolean {
  return _registeredEvents[event] !== undefined
}

function registerEvent(event: string, handler: (...params: unknown[]) => void, type: EventType): void {
  if (!hasEventHandlers(event)) {
    _registeredEvents[event] = [{name: handler.name, type}]
  } else {
    _registeredEvents[event].push({name: handler.name, type})
  }
}

export const HooksMock = {
  on(event: string, handler: (...params: unknown[]) => void): void {
    registerEvent(event, handler, 'multi')
  },

  once(event: string, handler: (...params: unknown[]) => void): void {
    registerEvent(event, handler, 'single')
  },

  getRegisteredEvent(event: string, handler: string): Handler | null {
    if (!hasEventHandlers(event)) {
      return null
    }

    return _registeredEvents[event].find((h) => h.name === handler) ?? null
  },
}
