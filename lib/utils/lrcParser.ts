import type { LyricData } from "@/lib/types"

export function parseLRC(lrcContent: string): LyricData[] {
  const lines = lrcContent.split("\n")
  const lyrics: LyricData[] = []

  // Regex pa’ agarrar los tiempos tipo [mm:ss.xx] o [mm:ss]
  const timeRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g

  lines.forEach((line) => {
    const matches = [...line.matchAll(timeRegex)]

    matches.forEach((match) => {
      const minutes = Number.parseInt(match[1])
      const seconds = Number.parseInt(match[2])
      const milliseconds = match[3] ? Number.parseInt(match[3].padEnd(3, "0")) : 0

      // Pasar todo a segundos, fácil
      const totalSeconds = minutes * 60 + seconds + milliseconds / 1000

      // Sacar el texto que queda después del tiempo
      const text = line.replace(timeRegex, "").trim()

      if (text && text.length > 0) {
        lyrics.push({
          time: totalSeconds,
          text: text,
        })
      }
    })
  })

  // Ordenamos pa’ que vayan al toque
  return lyrics.sort((a, b) => a.time - b.time)
}

export async function loadLRCFile(lrcPath: string): Promise<LyricData[]> {
  try {
    const response = await fetch(lrcPath)
    if (!response.ok) {
      throw new Error(`Failed to load LRC file: ${response.statusText}`)
    }
    const lrcContent = await response.text()
    return parseLRC(lrcContent)
  } catch (error) {
    console.error("Error loading LRC file:", error)
    return []
  }
}
