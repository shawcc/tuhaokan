import { useState, type ChangeEvent, type CSSProperties } from 'react'
import { createAssetId, fileToDataUrl } from '../../utils/file'
import { useEditorStore } from '../../store/editorStore'
import type { AssetSlot, BackgroundMode } from '../../types/editor'

function getBackgroundClass(mode: BackgroundMode) {
  if (mode === 'aurora') {
    return 'poster-canvas--aurora'
  }

  if (mode === 'paper') {
    return 'poster-canvas--paper'
  }

  return 'poster-canvas--midnight'
}

function EditableText({
  value,
  onChange,
  placeholder,
  className = '',
  rows,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
  rows?: number
}) {
  if (rows) {
    return (
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`poster-inline-input poster-inline-input--textarea ${className}`.trim()}
      />
    )
  }

  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={`poster-inline-input ${className}`.trim()}
    />
  )
}

function EditableImage({
  slot,
  src,
  alt,
  label,
  className = '',
}: {
  slot: AssetSlot
  src?: string
  alt: string
  label: string
  className?: string
}) {
  const setAsset = useEditorStore((state) => state.setAsset)
  const [error, setError] = useState('')

  const handleChange =
    (targetSlot: AssetSlot) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      try {
        const dataUrl = await fileToDataUrl(file)
        setAsset(targetSlot, {
          id: createAssetId(targetSlot),
          name: file.name,
          dataUrl,
        })
        setError('')
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : '上传失败')
      } finally {
        event.target.value = ''
      }
    }

  return (
    <div className={`poster-image-editor ${className}`.trim()}>
      {src ? <img src={src} alt={alt} /> : <div className="poster-placeholder"><span>{label}</span></div>}
      <label className="poster-image-editor__action">
        <input type="file" accept="image/*" onChange={handleChange(slot)} />
        {src ? '替换图片' : '上传图片'}
      </label>
      {error ? <span className="poster-image-editor__error">{error}</span> : null}
    </div>
  )
}

export function PosterCanvas() {
  const activeTemplate = useEditorStore((state) => state.activeTemplate)
  const accentColor = useEditorStore((state) => state.accentColor)
  const backgroundMode = useEditorStore((state) => state.backgroundMode)
  const assets = useEditorStore((state) => state.assets)
  const content = useEditorStore((state) => state.content)
  const updateField = useEditorStore((state) => state.updateField)
  const updateMetric = useEditorStore((state) => state.updateMetric)
  const updateHighlight = useEditorStore((state) => state.updateHighlight)

  const assetMap = Object.fromEntries(assets.map((item) => [item.slot, item.dataUrl])) as Record<AssetSlot, string | undefined>
  const canvasStyle = {
    '--accent-color': accentColor,
  } as CSSProperties

  return (
    <div className={`poster-canvas ${getBackgroundClass(backgroundMode)}`} style={canvasStyle}>
      {activeTemplate === 'highlights' ? (
        <section className="poster-layout poster-layout--highlights">
          <div className="poster-side-block">
            <EditableText
              value={content.title}
              onChange={(value) => updateField('title', value)}
              placeholder="输入主标题"
              className="poster-inline-input--title"
              rows={3}
            />
            <EditableText
              value={content.subtitle}
              onChange={(value) => updateField('subtitle', value)}
              placeholder="输入副标题"
              className="poster-inline-input--body"
              rows={4}
            />
            <div className="highlight-list highlight-list--compact">
              {content.highlights.slice(0, 3).map((item, index) => (
                <article key={item.id} className="highlight-pill highlight-pill--simple">
                  <span>0{index + 1}</span>
                  <EditableText
                    value={item.title}
                    onChange={(value) => updateHighlight(index, 'title', value)}
                    placeholder={`输入亮点 ${index + 1}`}
                    className="poster-inline-input--chip"
                  />
                </article>
              ))}
            </div>
          </div>
          <EditableImage slot="primary" src={assetMap.primary} alt="产品截图" label="产品截图" className="poster-visual-card" />
        </section>
      ) : null}

      {activeTemplate === 'cards' ? (
        <section className="poster-layout poster-layout--cards">
          <div className="poster-copy-block poster-copy-block--wide">
            <EditableText
              value={content.title}
              onChange={(value) => updateField('title', value)}
              placeholder="输入主标题"
              className="poster-inline-input--title"
              rows={2}
            />
            <EditableText
              value={content.subtitle}
              onChange={(value) => updateField('subtitle', value)}
              placeholder="输入副标题"
              className="poster-inline-input--body"
              rows={3}
            />
          </div>
          <EditableImage slot="primary" src={assetMap.primary} alt="产品截图" label="产品截图" className="poster-visual-card poster-visual-card--medium" />
          <div className="highlight-list">
            {content.highlights.slice(0, 3).map((item, index) => (
              <article key={item.id} className="highlight-pill highlight-pill--simple">
                <span>0{index + 1}</span>
                <EditableText
                  value={item.title}
                  onChange={(value) => updateHighlight(index, 'title', value)}
                  placeholder={`输入卡片 ${index + 1}`}
                  className="poster-inline-input--chip"
                />
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTemplate === 'steps' ? (
        <section className="poster-layout poster-layout--steps">
          <div className="poster-copy-block">
            <EditableText
              value={content.title}
              onChange={(value) => updateField('title', value)}
              placeholder="输入主标题"
              className="poster-inline-input--title"
              rows={2}
            />
            <EditableText
              value={content.subtitle}
              onChange={(value) => updateField('subtitle', value)}
              placeholder="输入流程说明"
              className="poster-inline-input--body"
              rows={3}
            />
            <div className="step-list">
              {content.highlights.slice(0, 3).map((item, index) => (
                <article key={item.id} className="step-card">
                  <span>0{index + 1}</span>
                  <EditableText
                    value={item.title}
                    onChange={(value) => updateHighlight(index, 'title', value)}
                    placeholder={`输入步骤 ${index + 1}`}
                    className="poster-inline-input--chip"
                  />
                </article>
              ))}
            </div>
          </div>
          <EditableImage slot="primary" src={assetMap.primary} alt="流程截图" label="流程截图" className="poster-visual-card poster-visual-card--tall" />
        </section>
      ) : null}

      {activeTemplate === 'compare' ? (
        <section className="poster-layout poster-layout--compare">
          <div className="poster-copy-block poster-copy-block--wide">
            <EditableText
              value={content.title}
              onChange={(value) => updateField('title', value)}
              placeholder="输入主标题"
              className="poster-inline-input--title"
              rows={2}
            />
            <EditableText
              value={content.subtitle}
              onChange={(value) => updateField('subtitle', value)}
              placeholder="输入对比说明"
              className="poster-inline-input--body"
              rows={3}
            />
          </div>
          <div className="compare-grid">
            <EditableImage slot="hero" src={assetMap.hero} alt="对比前图片" label="对比前" className="compare-card" />
            <EditableImage slot="primary" src={assetMap.primary ?? assetMap.secondary} alt="对比后图片" label="对比后" className="compare-card compare-card--accent" />
          </div>
        </section>
      ) : null}

      {activeTemplate === 'metrics' ? (
        <section className="poster-layout poster-layout--metrics">
          <div className="poster-copy-block">
            <EditableText
              value={content.title}
              onChange={(value) => updateField('title', value)}
              placeholder="输入主标题"
              className="poster-inline-input--title"
              rows={2}
            />
            <div className="metric-stack">
              {content.metrics.slice(0, 3).map((metric, index) => (
                <article key={`${metric}-${index}`} className="metric-stack__item">
                  <EditableText
                    value={metric}
                    onChange={(value) => updateMetric(index, value)}
                    placeholder={`输入指标 ${index + 1}`}
                    className="poster-inline-input--metric"
                  />
                </article>
              ))}
            </div>
          </div>
          <EditableImage slot="primary" src={assetMap.primary} alt="成果截图" label="成果截图" className="poster-visual-card poster-visual-card--metrics" />
        </section>
      ) : null}

      {activeTemplate === 'devices' ? (
        <section className="poster-layout poster-layout--devices">
          <div className="poster-copy-block">
            <EditableText
              value={content.title}
              onChange={(value) => updateField('title', value)}
              placeholder="输入主标题"
              className="poster-inline-input--title"
              rows={2}
            />
            <EditableText
              value={content.subtitle}
              onChange={(value) => updateField('subtitle', value)}
              placeholder="输入多端说明"
              className="poster-inline-input--body"
              rows={3}
            />
          </div>
          <div className="device-stage">
            <EditableImage slot="primary" src={assetMap.primary} alt="桌面端截图" label="桌面端截图" className="device-frame device-frame--desktop" />
            <EditableImage slot="secondary" src={assetMap.secondary} alt="移动端截图" label="移动端截图" className="device-frame device-frame--mobile" />
          </div>
        </section>
      ) : null}

      {activeTemplate === 'case' ? (
        <section className="poster-layout poster-layout--case">
          <div className="case-quote-card">
            <EditableText
              value={content.title}
              onChange={(value) => updateField('title', value)}
              placeholder="输入主标题"
              className="poster-inline-input--title"
              rows={2}
            />
            <EditableText
              value={content.quote}
              onChange={(value) => updateField('quote', value)}
              placeholder="输入客户引用语"
              className="poster-inline-input--quote"
              rows={5}
            />
            <EditableText
              value={content.customerName}
              onChange={(value) => updateField('customerName', value)}
              placeholder="输入客户名称"
              className="poster-inline-input--chip"
            />
          </div>
          <EditableImage slot="primary" src={assetMap.primary} alt="案例截图" label="案例截图" className="poster-visual-card poster-visual-card--case" />
        </section>
      ) : null}
    </div>
  )
}
