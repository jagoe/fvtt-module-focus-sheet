/**
 * Generic asynchronous waiting operation
 * @param condition If this function evaluates to true, the Promise gets resolved
 * @param timeout Timeout in ms; if exceeded, the Promise gets rejected [default: 1000 ms]
 */
export async function waitFor(condition: () => boolean, {timeout = 1000, title}: {timeout?: number; title?: string} = {}): Promise<void> {
  for (let time = 0, step = 20; time < timeout; time += step) {
    if (condition()) {
      return
    }

    await sleep(step)
  }

  throw new Error(`Timout of ${timeout} ms exceeded${title !== undefined ? ` (${title})` : ''}`)
}

async function sleep(ms: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
