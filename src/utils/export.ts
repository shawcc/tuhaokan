import { toPng } from 'html-to-image'
import { POSTER_HEIGHT, POSTER_WIDTH } from '../data/templates'

export function createDownloadName(value: string) {
  const normalized = value
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[/:*?"<>|\\]/g, '')
    .slice(0, 48)

  return normalized || 'tuhaokan-poster'
}

export async function exportPosterAsPng(node: HTMLElement, fileBaseName: string) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    canvasWidth: POSTER_WIDTH,
    canvasHeight: POSTER_HEIGHT,
  })

  const link = document.createElement('a')
  link.download = `${createDownloadName(fileBaseName)}.png`
  link.href = dataUrl
  link.click()
}
