import { Monitor, Smartphone, Sparkles } from 'lucide-react'
import { type CSSProperties } from 'react'
import { getTemplateById } from '../../data/templates'
import { useEditorStore } from '../../store/editorStore'
import type { AssetSlot, BackgroundMode, HighlightItem } from '../../types/editor'

function getBackgroundClass(mode: BackgroundMode) {
  if (mode === 'aurora') {
    return 'poster-canvas--aurora'
  }

  if (mode === 'paper') {
    return 'poster-canvas--paper'
  }

  return 'poster-canvas--midnight'
}

function PosterImage({
  src,
  alt,
  label,
  className = '',
}: {
  src?: string
  alt: string
  label: string
  className?: string
}) {
  if (src) {
    return <img src={src} alt={alt} className={className} />
  }

  return (
    <div className={`poster-placeholder ${className}`.trim()}>
      <span>{label}</span>
      <small>Meegle 产品界面</small>
    </div>
  )
}

function HighlightList({ items, compact = false }: { items: HighlightItem[]; compact?: boolean }) {
  return (
    <div className={compact ? 'highlight-list highlight-list--compact' : 'highlight-list'}>
      {items.map((item, index) => (
        <article key={item.id} className="highlight-pill">
          <span>0{index + 1}</span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export function PosterCanvas() {
  const activeTemplate = useEditorStore((state) => state.activeTemplate)
  const accentColor = useEditorStore((state) => state.accentColor)
  const backgroundMode = useEditorStore((state) => state.backgroundMode)
  const assets = useEditorStore((state) => state.assets)
  const content = useEditorStore((state) => state.content)
  const template = getTemplateById(activeTemplate)

  const assetMap = Object.fromEntries(assets.map((item) => [item.slot, item.dataUrl])) as Record<AssetSlot, string | undefined>
  const canvasStyle = {
    '--accent-color': accentColor,
  } as CSSProperties

  return (
    <div className={`poster-canvas ${getBackgroundClass(backgroundMode)}`} style={canvasStyle}>
      <div className="poster-canvas__glow" />
      <header className="poster-topline">
        <div className="poster-brand">
          <div className="poster-brand__logo">
            {assetMap.logo ? (
              <img src={assetMap.logo} alt={`${content.brandName} logo`} />
            ) : (
              <span>{content.brandName.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div>
            <strong>{content.brandName}</strong>
            <p>{template.name}</p>
          </div>
        </div>
        <div className="poster-badges">
          {content.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </header>

      {activeTemplate === 'hero' ? (
        <section className="poster-layout poster-layout--hero">
          <div className="poster-copy-block">
            <span className="poster-tagline">Project Collaboration Platform</span>
            <h1>{content.title}</h1>
            <p>{content.subtitle}</p>
            <div className="metric-row">
              {content.metrics.map((metric) => (
                <div key={metric} className="metric-card">
                  <Sparkles size={16} />
                  <strong>{metric}</strong>
                </div>
              ))}
            </div>
            <div className="poster-cta">{content.ctaText}</div>
          </div>
          <div className="poster-visual-card poster-visual-card--hero">
            <PosterImage src={assetMap.hero ?? assetMap.primary} alt="主视觉图" label="主视觉图" />
          </div>
        </section>
      ) : null}

      {activeTemplate === 'highlights' ? (
        <section className="poster-layout poster-layout--highlights">
          <div className="poster-visual-card">
            <PosterImage src={assetMap.primary} alt="产品截图" label="产品截图 A" />
          </div>
          <div className="poster-side-block">
            <span className="poster-tagline">Meegle Workspace</span>
            <h1>{content.title}</h1>
            <p>{content.subtitle}</p>
            <HighlightList items={content.highlights} compact />
          </div>
        </section>
      ) : null}

      {activeTemplate === 'cards' ? (
        <section className="poster-layout poster-layout--cards">
          <div className="poster-copy-block poster-copy-block--wide">
            <span className="poster-tagline">Productivity Suite</span>
            <h1>{content.title}</h1>
            <p>{content.subtitle}</p>
          </div>
          <div className="poster-visual-card poster-visual-card--medium">
            <PosterImage src={assetMap.primary} alt="产品截图" label="产品截图 A" />
          </div>
          <HighlightList items={content.highlights} />
        </section>
      ) : null}

      {activeTemplate === 'steps' ? (
        <section className="poster-layout poster-layout--steps">
          <div className="poster-copy-block">
            <span className="poster-tagline">From Plan to Delivery</span>
            <h1>{content.title}</h1>
            <p>{content.scene}</p>
            <div className="step-list">
              {content.highlights.map((item, index) => (
                <article key={item.id} className="step-card">
                  <span>0{index + 1}</span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="poster-visual-card poster-visual-card--tall">
            <PosterImage src={assetMap.primary} alt="产品截图" label="产品截图 A" />
          </div>
        </section>
      ) : null}

      {activeTemplate === 'compare' ? (
        <section className="poster-layout poster-layout--compare">
          <div className="poster-copy-block poster-copy-block--wide">
            <span className="poster-tagline">Before / After</span>
            <h1>{content.title}</h1>
            <p>{content.subtitle}</p>
          </div>
          <div className="compare-grid">
            <article className="compare-card">
              <small>Fragmented workflow</small>
              <PosterImage src={assetMap.hero} alt="对比前图片" label="对比前图片" />
            </article>
            <article className="compare-card compare-card--accent">
              <small>Unified in Meegle</small>
              <PosterImage src={assetMap.primary ?? assetMap.secondary} alt="对比后图片" label="对比后图片" />
            </article>
          </div>
        </section>
      ) : null}

      {activeTemplate === 'metrics' ? (
        <section className="poster-layout poster-layout--metrics">
          <div className="poster-copy-block">
            <span className="poster-tagline">Measurable Impact</span>
            <h1>{content.title}</h1>
            <p>{content.scene}</p>
            <div className="metric-stack">
              {content.metrics.map((metric) => (
                <article key={metric} className="metric-stack__item">
                  <strong>{metric}</strong>
                </article>
              ))}
            </div>
          </div>
          <div className="poster-visual-card poster-visual-card--metrics">
            <PosterImage src={assetMap.primary} alt="产品截图" label="产品截图 A" />
          </div>
        </section>
      ) : null}

      {activeTemplate === 'devices' ? (
        <section className="poster-layout poster-layout--devices">
          <div className="poster-copy-block">
            <span className="poster-tagline">Work across screens</span>
            <h1>{content.title}</h1>
            <p>{content.subtitle}</p>
            <div className="device-hints">
              <span>
                <Monitor size={16} />
                Web workspace
              </span>
              <span>
                <Smartphone size={16} />
                Mobile access
              </span>
            </div>
          </div>
          <div className="device-stage">
            <div className="device-frame device-frame--desktop">
              <PosterImage src={assetMap.primary} alt="桌面端截图" label="桌面端截图" />
            </div>
            <div className="device-frame device-frame--mobile">
              <PosterImage src={assetMap.secondary ?? assetMap.hero} alt="移动端截图" label="移动端截图" />
            </div>
          </div>
        </section>
      ) : null}

      {activeTemplate === 'case' ? (
        <section className="poster-layout poster-layout--case">
          <div className="case-quote-card">
            <span className="poster-tagline">客户案例</span>
            <h1>{content.title}</h1>
            <blockquote>{content.quote}</blockquote>
            <strong>{content.customerName}</strong>
            <div className="metric-row">
              {content.metrics.map((metric) => (
                <div key={metric} className="metric-card metric-card--soft">
                  <strong>{metric}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="poster-visual-card poster-visual-card--case">
            <PosterImage src={assetMap.primary ?? assetMap.hero} alt="案例截图" label="案例截图" />
            <div className="case-highlight-box">
              <strong>{content.highlights[0]?.title}</strong>
              <p>{content.highlights[0]?.description}</p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
