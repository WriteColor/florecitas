import type React from "react"

// Estructura de datos pa' las letras
export interface LyricData {
  text: string
  time: number
}

// Info de cada canción
export interface Song {
  id: string
  title: string
  artist: string
  audioFile: string
  lrcFile: string
  duration?: number
}

// Props pa' los controles de audio
export interface AudioControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>
  lyrics: LyricData[]
}

// Props pa' la animación de flores
export interface FlowerAnimationProps {
  className?: string
}

// Estado del playlist
export interface PlaylistState {
  songs: Song[]
  currentIndex: number
  currentSong: Song | null
  isPlaying: boolean
  isLoading: boolean
}
