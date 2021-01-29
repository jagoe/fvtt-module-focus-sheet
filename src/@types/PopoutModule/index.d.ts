declare interface PopoutModuleContainer {
  singleton: Popout
}

declare class Popout {
  public poppedOut: Map<number, PopoutState>
}

declare class PopoutState {
  window: Window
}
