"use client"
import { useState, useEffect } from "react"
import { X, Heart } from "lucide-react"
import { Quantum } from 'ldrs/react'

import { AudioControls } from "./AudioControls"
import type { Song } from "@/lib/types"
import { useTranslate } from "@/hooks/useTranslate"

interface ToastNotificationProps {
  type: "lyrics" | "title"
  content: string
  opacity: number
  isVisible: boolean
  isPersistent?: boolean
  currentSong?: Song | null
  isPlaying?: boolean
  isLoading?: boolean
  hasValidAudio?: boolean
  onPlayPause?: () => void
  onPrevious?: () => void
  onNext?: () => void
  canGoPrevious?: boolean
  canGoNext?: boolean
}

export function ToastNotification({
  type,
  content,
  opacity,
  isVisible,
  isPersistent = false,
  currentSong,
  isPlaying = false,
  isLoading = false,
  hasValidAudio = false,
  onPlayPause,
  onPrevious,
  onNext,
  canGoPrevious = false,
  canGoNext = false,
}: ToastNotificationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showToggleButton, setShowToggleButton] = useState(false)
  const { t } = useTranslate()

  // Título dinámico según el estado
  const getToastTitle = () => {
    if (currentSong && isPlaying) {
      return t("toast.playing")
    }
    return t("toast.message")
  }

  // Subtítulo con info de la canción
  const getToastSubtitle = () => {
    if (currentSong && isPlaying) {
      return `${currentSong.title} - ${currentSong.artist}`
    }
    return t("toast.noSong")
  }

  useEffect(() => {
    if (!isOpen && isVisible) {
      setShowToggleButton(true)
    } else if (!isVisible && !isPersistent) {
      setShowToggleButton(false)
    }
  }, [isOpen, isVisible, isPersistent])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setShowToggleButton(false)
  }

  if (!isVisible && !showToggleButton && !isPersistent) return null

  const Icon = currentSong && isPlaying ? Quantum : Heart

  return (
    <>
      {/* Toast principal con mejor estructura */}
      {isOpen && isVisible && (
        <div
          className={`toast-notification toast-${type}`}
          style={{
            opacity: isPersistent ? Math.max(0.7, opacity) : Math.min(opacity, 1),
            transform: `translateX(${isOpen ? "0" : "100%"})`,
          }}
        >
          {/* Header con info de la canción */}
          <div className="toast-header">
            <div className={`toast-icon ${currentSong && isPlaying ? "icon-playing" : ""}`}>
              <Icon
                size={currentSong && isPlaying ? "30" : "16"}
                speed={currentSong && isPlaying ? "2.5" : undefined}
                color={currentSong && isPlaying ? "pink" : undefined}
              />            </div>
            <div className="toast-info">
              <span className="toast-label">{getToastTitle()}</span>
              <span className="toast-song-title">{getToastSubtitle()}</span>
            </div>
            <button onClick={handleClose} className="toast-close-btn" aria-label="Cerrar notificación">
              <X size={16} />
            </button>
          </div>

          {/* Contenido principal centrado */}
          <div className="toast-content-wrapper">
            <div className="toast-content">{content}</div>
          </div>

          {/* Controles de audio centrados */}
          {onPlayPause && onPrevious && onNext && (
            <div className="toast-controls-wrapper">
              <AudioControls
                currentSong={currentSong ?? null}
                isPlaying={isPlaying}
                isLoading={isLoading}
                hasValidAudio={hasValidAudio}
                onPlayPause={onPlayPause}
                onPrevious={onPrevious}
                onNext={onNext}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
              />
            </div>
          )}
        </div>
      )}

      {/* Botón pa' reabrir */}
      {(showToggleButton || (isPersistent && !isOpen)) && (
        <button
          onClick={handleOpen}
          className={`toast-toggle-btn toggle-${currentSong && isPlaying ? "lyrics" : type}`}
          aria-label="Abrir reproductor"
          style={{ opacity: 1 }}
        >
          <Icon
            size={currentSong && isPlaying ? "30" : "18"}
            speed={currentSong && isPlaying ? "2.5" : undefined}
            color={currentSong && isPlaying ? "pink" : undefined}
          />
        </button>
      )}
    </>
  )
}
