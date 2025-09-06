"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { FlowerAnimation } from "./FlowerAnimation"
import { NightBackground } from "./NightBackground"
import { ToastNotification } from "./ToastNotification"
import { usePlaylist } from "@/hooks/usePlaylist"
import { useLyricsSync } from "@/hooks/useLyricsSync"
import { useTitleFade } from "@/hooks/useTitleFade"
import { useTranslate } from "@/hooks/useTranslate"
import { Mirage } from "ldrs/react"

export function FlowerPage() {
  const { t } = useTranslate()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { playlist, currentLyrics, hasValidAudio, nextSong, previousSong, togglePlayPause } = usePlaylist(
    audioRef as React.RefObject<HTMLAudioElement>,
  )

  const { currentLyric, lyricOpacity } = useLyricsSync(
    audioRef as React.RefObject<HTMLAudioElement>,
    currentLyrics,
    playlist.isPlaying,
  )

  const { titleOpacity } = useTitleFade()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const getDisplayContent = () => {
    if (currentLyric && currentLyric.length > 0 && playlist.isPlaying) {
      return currentLyric
    }
    if (playlist.isPlaying) {
      return <Mirage size="60" speed="3.5" color="rgba(240, 240, 240, 0.6)" />
    }
    return (
      <span>
        {t("flower.noLyrics")}{" "}
        <a
          href="https://github.com/WriteColor/florecitas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-200 underline"
        >
          GitHub
        </a>
      </span>
    )
  }

  const getDisplayOpacity = () => {
    if (currentLyric && playlist.isPlaying) {
      return Math.max(0.7, lyricOpacity)
    }
    return Math.max(0.7, titleOpacity)
  }

  const getToastType = () => {
    return currentLyric && playlist.isPlaying ? "lyrics" : "title"
  }

  return (
    <div className={`flower-container ${!isLoaded ? "container" : ""}`}>
      <audio ref={audioRef} preload="auto">
        {playlist.currentSong && <source src={playlist.currentSong.audioFile} type="audio/mpeg" />}
        {t("flower.noAudio")}
      </audio>

      <ToastNotification
        type={getToastType()}
        content={getDisplayContent() as any}
        opacity={getDisplayOpacity()}
        isVisible={true}
        isPersistent={true}
        currentSong={playlist.currentSong}
        isPlaying={playlist.isPlaying}
        isLoading={playlist.isLoading}
        hasValidAudio={hasValidAudio}
        onPlayPause={togglePlayPause}
        onPrevious={previousSong}
        onNext={nextSong}
        canGoPrevious={playlist.songs.length > 1}
        canGoNext={playlist.songs.length > 1}
      />

      <NightBackground />
      <FlowerAnimation />
    </div>
  )
}
