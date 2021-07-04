declare namespace PopoutModule {
  const singleton: Popout

  function popoutApp(app: Application): void

  class Popout {
    public poppedOut: Map<number, PopoutState>
    public ID: string
  }

  class PopoutState {
    window: Window
  }
}
