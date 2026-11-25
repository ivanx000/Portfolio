// Background ambience: one looping recording at a time, crossfaded through Web Audio
// gain nodes (element.volume is ignored on iOS). Browsers only allow audio to start
// from a click or key press, so `play` must be called from one.

export type TrackId = 'rain' | 'waves' | 'night' | 'fire'

export type Track = {
  id: TrackId
  label: string
  note: string
  src: string
  credit: { author: string; licence: string; href: string }
}

// Recordings from Wikimedia Commons, trimmed into seamless loops and level-matched.
const C = 'https://commons.wikimedia.org/wiki/File:'
export const TRACKS: Track[] = [
  {
    id: 'rain',
    label: 'Rain in the woods',
    note: 'Soft rain, far-off thunder',
    src: '/audio/rain.mp3',
    credit: { author: 'kvgarlic', licence: 'CC0', href: `${C}Light_Rain_Distant_Thunder_July_5th_2016.wav` },
  },
  {
    id: 'waves',
    label: 'Lakeshore',
    note: 'Lake Ontario on the rocks',
    src: '/audio/waves.mp3',
    credit: { author: 'Dsw4', licence: 'CC BY 3.0', href: `${C}Water_on_Rocks.ogg` },
  },
  {
    id: 'night',
    label: 'Night pond',
    note: 'Frogs and crickets at dusk',
    src: '/audio/night.mp3',
    credit: { author: 'Glaneur de sons', licence: 'CC BY 3.0', href: `${C}Nature_sounds_ambience_in_a_Dordogne_pond.ogg` },
  },
  {
    id: 'fire',
    label: 'Campfire',
    note: 'Crackling wood',
    src: '/audio/fire.mp3',
    credit: { author: 'Glaneur de sons', licence: 'CC BY 3.0', href: `${C}Campfire_sound_ambience.ogg` },
  },
]

const FADE = 1.2 // seconds

type Voice = { el: HTMLAudioElement; gain: GainNode }

class Ambience {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private voices = new Map<TrackId, Voice>()
  private current: TrackId | null = null
  private volume = 0.6

  private ensure() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.volume
      this.master.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  private voice(id: TrackId) {
    let v = this.voices.get(id)
    if (!v) {
      const ctx = this.ensure()
      const el = new Audio(TRACKS.find((t) => t.id === id)!.src)
      el.loop = true
      el.preload = 'auto'
      const gain = ctx.createGain()
      gain.gain.value = 0
      ctx.createMediaElementSource(el).connect(gain)
      gain.connect(this.master!)
      v = { el, gain }
      this.voices.set(id, v)
    }
    return v
  }

  private fade(v: Voice, to: number, then?: () => void) {
    const ctx = this.ensure()
    const g = v.gain.gain
    g.cancelScheduledValues(ctx.currentTime)
    g.setValueAtTime(g.value, ctx.currentTime)
    g.linearRampToValueAtTime(to, ctx.currentTime + FADE)
    if (then) window.setTimeout(then, FADE * 1000 + 50)
  }

  play(id: TrackId) {
    this.ensure()
    if (this.current && this.current !== id) this.stopVoice(this.current)
    this.current = id
    const v = this.voice(id)
    void v.el.play().catch(() => {})
    this.fade(v, 1)
  }

  stop() {
    if (this.current) this.stopVoice(this.current)
    this.current = null
  }

  private stopVoice(id: TrackId) {
    const v = this.voices.get(id)
    if (!v) return
    this.fade(v, 0, () => {
      if (this.current !== id) v.el.pause()
    })
  }

  setVolume(v: number) {
    this.volume = v
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05)
  }
}

export const ambience = new Ambience()
