/**
 * Generic asynchronous waiting operation
 * @param condition If this function evaluates to true, the Promise gets resolved
 * @param timeout Timeout is ms; if exceeded, the Promise gets rejected
 */
export async function waitFor(condition: () => boolean, timeout = 1000, title?: string): Promise<void> {
  for (let time = 0, step = 100; time < timeout; time += step) {
    if (condition()) {
      return
    }

    await sleep(step)
  }

  throw new Error(`Timout of ${timeout}ms exceeded${title !== undefined ? ` (${title})` : ''}`)
}

async function sleep(ms: number): Promise<void> {
  return await new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
