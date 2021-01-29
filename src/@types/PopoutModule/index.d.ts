declare namespace PopoutModule {
  const singleton: Popout

  class Popout {
    public poppedOut: Map<number, PopoutState>
    public ID: string
    public onPopoutClicked(domID: string, app: Application)
  }

  class PopoutState {
    window: Window
  }
}
