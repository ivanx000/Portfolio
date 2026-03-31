import { useEffect, useRef, type VideoHTMLAttributes } from 'react'
import Hls from 'hls.js'

type HLSVideoProps = {
  src: string
  className?: string
} & Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'>

function HLSVideo({ src, className, ...videoProps }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) {
      return
    }

    const isHlsSource = /\.m3u8($|\?)/i.test(src)

    if (!isHlsSource) {
      video.src = src
      return
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      return
    }

    if (!Hls.isSupported()) {
      return
    }

    const hls = new Hls()
    hls.loadSource(src)
    hls.attachMedia(video)

    return () => {
      hls.destroy()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      muted
      loop
      autoPlay
      playsInline
      className={className}
      {...videoProps}
    />
  )
}

export default HLSVideo