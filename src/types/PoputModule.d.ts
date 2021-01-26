declare class PopoutModule {
  public static singleton: PopoutModule

  public poppedOut: Map<number, PopoutState>
}

declare class PopoutState {
  window: Window
}
