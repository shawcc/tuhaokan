import { RotateCcw } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'

export function TextFieldsPanel() {
  const content = useEditorStore((state) => state.content)
  const updateField = useEditorStore((state) => state.updateField)
  const updateBadge = useEditorStore((state) => state.updateBadge)
  const updateMetric = useEditorStore((state) => state.updateMetric)
  const updateHighlight = useEditorStore((state) => state.updateHighlight)
  const resetDemo = useEditorStore((state) => state.resetDemo)

  return (
    <div className="text-panel">
      <div className="text-panel__toolbar">
        <button type="button" className="ghost-button" onClick={resetDemo}>
          <RotateCcw size={14} />
          Meegle 示例
        </button>
      </div>

      <div className="field-grid field-grid--two">
        <label className="field-block">
          <span className="field-label">品牌名</span>
          <input
            value={content.brandName}
            onChange={(event) => updateField('brandName', event.target.value)}
            placeholder="Meegle"
          />
        </label>
        <label className="field-block">
          <span className="field-label">行动按钮文案</span>
          <input
            value={content.ctaText}
            onChange={(event) => updateField('ctaText', event.target.value)}
            placeholder="了解产品"
          />
        </label>
        <label className="field-block field-block--full">
          <span className="field-label">主标题</span>
          <input
            value={content.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="产品主张"
          />
        </label>
        <label className="field-block field-block--full">
          <span className="field-label">副标题</span>
          <textarea
            rows={3}
            value={content.subtitle}
            onChange={(event) => updateField('subtitle', event.target.value)}
            placeholder="产品介绍"
          />
        </label>
        <label className="field-block field-block--full">
          <span className="field-label">适用场景</span>
          <textarea
            rows={3}
            value={content.scene}
            onChange={(event) => updateField('scene', event.target.value)}
            placeholder="适用场景"
          />
        </label>
        <label className="field-block">
          <span className="field-label">客户名</span>
          <input
            value={content.customerName}
            onChange={(event) => updateField('customerName', event.target.value)}
            placeholder="客户名称"
          />
        </label>
        <label className="field-block">
          <span className="field-label">客户引用语</span>
          <input
            value={content.quote}
            onChange={(event) => updateField('quote', event.target.value)}
            placeholder="客户评价"
          />
        </label>
      </div>

      <div className="field-group-list">
        <div className="mini-group">
          <h3>标签</h3>
          <div className="field-grid">
            {content.badges.map((badge, index) => (
              <label key={index} className="field-block">
                <span className="field-label">标签 {index + 1}</span>
                <input
                  value={badge}
                  onChange={(event) => updateBadge(index, event.target.value)}
                  placeholder="标签"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mini-group">
          <h3>指标</h3>
          <div className="field-grid">
            {content.metrics.map((metric, index) => (
              <label key={index} className="field-block">
                <span className="field-label">指标 {index + 1}</span>
                <input
                  value={metric}
                  onChange={(event) => updateMetric(index, event.target.value)}
                  placeholder="指标"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mini-group">
          <h3>亮点说明</h3>
          <div className="highlight-editor-list">
            {content.highlights.map((item, index) => (
              <div key={item.id} className="highlight-editor-card">
                <span className="highlight-editor-card__index">0{index + 1}</span>
                <div className="field-grid">
                  <label className="field-block">
                    <span className="field-label">亮点标题</span>
                    <input
                      value={item.title}
                      onChange={(event) => updateHighlight(index, 'title', event.target.value)}
                      placeholder="亮点标题"
                    />
                  </label>
                  <label className="field-block field-block--full">
                    <span className="field-label">亮点描述</span>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(event) => updateHighlight(index, 'description', event.target.value)}
                      placeholder="亮点描述"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
