"use client"

import { ArrowBigLeftDash, ArrowBigRightDash, PlayCircle, PauseCircle } from "lucide-react"
import { LineSpinner } from "ldrs/react"
import type { Song } from "@/lib/types"

interface AudioControlsProps {
  currentSong: Song | null
  isPlaying: boolean
  isLoading: boolean
  hasValidAudio: boolean
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
}

export function AudioControls({
  currentSong,
  isPlaying,
  isLoading,
  hasValidAudio,
  onPlayPause,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: AudioControlsProps) {
  return (
    <div className="audio-controls">
      {/* Botón anterior */}
      <button
        onClick={onPrevious}
        className={`audio-control-btn ${!canGoPrevious ? "disabled" : ""}`}
        aria-label="Canción anterior"
        disabled={!canGoPrevious || isLoading}
      >
        <ArrowBigLeftDash size={16} />
      </button>

      {/* Botón principal play/pause */}
      <button
        onClick={onPlayPause}
        className={`audio-control-btn primary ${!hasValidAudio || isLoading ? "disabled" : ""}`}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        disabled={!hasValidAudio || isLoading}
      >
        {isLoading ? (
          <LineSpinner size={20} color="white" />
        ) : isPlaying ? (
          <PauseCircle size={16} />
        ) : (
          <PlayCircle size={16} />
        )}
      </button>

      {/* Botón siguiente */}
      <button
        onClick={onNext}
        className={`audio-control-btn ${!canGoNext ? "disabled" : ""}`}
        aria-label="Siguiente canción"
        disabled={!canGoNext || isLoading}
      >
        <ArrowBigRightDash size={16} />
      </button>
    </div>
  )
}
