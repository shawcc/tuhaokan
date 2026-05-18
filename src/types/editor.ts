export type TemplateId =
  | 'hero'
  | 'highlights'
  | 'cards'
  | 'steps'
  | 'compare'
  | 'metrics'
  | 'devices'
  | 'case'

export type BackgroundMode = 'midnight' | 'aurora' | 'paper'
export type AssetSlot = 'logo' | 'hero' | 'primary' | 'secondary'

export interface UploadedAsset {
  id: string
  slot: AssetSlot
  name: string
  dataUrl: string
}

export interface HighlightItem {
  id: string
  title: string
  description: string
}

export interface PosterContent {
  brandName: string
  title: string
  subtitle: string
  ctaText: string
  scene: string
  badges: string[]
  metrics: string[]
  highlights: HighlightItem[]
  customerName: string
  quote: string
}
