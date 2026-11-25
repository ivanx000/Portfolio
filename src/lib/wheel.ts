// Splits a stream of wheel events into gestures, so one swipe (or one wheel notch)
// turns exactly one page however long its momentum lasts.
//
// A new gesture starts when:
//   - the wheel has been quiet for a moment, or
//   - the deltas were dying away (momentum) and suddenly rise again (a fresh swipe), or
//   - a firm mouse-wheel notch arrives a little after the last page landed.

const GAP_MS = 120
const LANDED_MS = 350
const NOTCH = 40

export class WheelGestures {
  private last = -Infinity
  private lastAbs = 0
  private peak = 0
  private decaying = false

  /** Returns true when this event begins a new gesture. */
  push(now: number, deltaY: number, msSinceLanded: number): boolean {
    const abs = Math.abs(deltaY)
    const quiet = now - this.last > GAP_MS
    const risesAgain = this.decaying && abs > this.lastAbs * 1.4 && abs > 6
    // momentum only ever shrinks, so a firm delta that doesn't shrink is a real notch
    const notch = msSinceLanded > LANDED_MS && abs >= NOTCH && abs >= this.lastAbs
    const fresh = quiet || risesAgain || notch

    if (fresh) {
      this.peak = abs
      this.decaying = false
    } else {
      this.peak = Math.max(this.peak, abs)
      if (abs < this.peak * 0.75) this.decaying = true
    }
    this.last = now
    this.lastAbs = abs
    return fresh
  }
}
