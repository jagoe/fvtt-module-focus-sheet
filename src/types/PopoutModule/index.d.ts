declare module PopoutModule {
  const singleton: Popout

  class Popout {
    public poppedOut: Map<number, PopoutState>
  }

  class PopoutState {
    window: Window
  }
}
