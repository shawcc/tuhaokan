import { RotateCcw } from 'lucide-react'
import { getTemplateById } from '../../data/templates'
import { useEditorStore } from '../../store/editorStore'

export function TextFieldsPanel() {
  const activeTemplate = useEditorStore((state) => state.activeTemplate)
  const content = useEditorStore((state) => state.content)
  const updateField = useEditorStore((state) => state.updateField)
  const updateMetric = useEditorStore((state) => state.updateMetric)
  const updateHighlight = useEditorStore((state) => state.updateHighlight)
  const resetDemo = useEditorStore((state) => state.resetDemo)
  const template = getTemplateById(activeTemplate)

  return (
    <div className="text-panel">
      <div className="text-panel__toolbar">
        <button type="button" className="ghost-button" onClick={resetDemo}>
          <RotateCcw size={14} />
          Meegle 示例
        </button>
      </div>

      <div className="field-group-list">
        {template.contentEditors.map((editor, editorIndex) => {
          if (editor.type === 'field') {
            const value = content[editor.key]

            return (
              <label key={`${editor.type}-${editor.key}`} className="field-block">
                <span className="field-label">{editor.label}</span>
                {editor.rows ? (
                  <textarea
                    rows={editor.rows}
                    value={typeof value === 'string' ? value : ''}
                    onChange={(event) => updateField(editor.key, event.target.value)}
                    placeholder={editor.placeholder}
                  />
                ) : (
                  <input
                    value={typeof value === 'string' ? value : ''}
                    onChange={(event) => updateField(editor.key, event.target.value)}
                    placeholder={editor.placeholder}
                  />
                )}
              </label>
            )
          }

          if (editor.type === 'metrics') {
            return (
              <section key={`${editor.type}-${editorIndex}`} className="mini-group">
                <strong className="field-label">{editor.label}</strong>
                <div className="field-grid">
                  {content.metrics.slice(0, editor.count).map((metric, index) => (
                    <label key={index} className="field-block">
                      <span className="field-label">{editor.label} {index + 1}</span>
                      <input
                        value={metric}
                        onChange={(event) => updateMetric(index, event.target.value)}
                        placeholder={`输入${editor.label.toLowerCase()}`}
                      />
                    </label>
                  ))}
                </div>
              </section>
            )
          }

          return (
            <section key={`${editor.type}-${editorIndex}`} className="mini-group">
              <strong className="field-label">{editor.label}</strong>
              <div className="field-grid">
                {content.highlights.slice(0, editor.count).map((item, index) => (
                  <label key={item.id} className="field-block">
                    <span className="field-label">{editor.label} {index + 1}</span>
                    <input
                      value={item.title}
                      onChange={(event) => updateHighlight(index, 'title', event.target.value)}
                      placeholder={`输入${editor.label.toLowerCase()}`}
                    />
                  </label>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
