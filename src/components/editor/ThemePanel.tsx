import { Check, Palette, Sparkles } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import type { BackgroundMode } from '../../types/editor'

const themes: { id: BackgroundMode; label: string; hint: string }[] = [
  { id: 'midnight', label: '深色舞台', hint: '更像专业编辑器，适合科技感场景。' },
  { id: 'aurora', label: '极光背景', hint: '更适合品牌展示和活动感内容。' },
  { id: 'paper', label: '浅色商务', hint: '适合白底官网或销售资料风格。' },
]

export function ThemePanel() {
  const accentColor = useEditorStore((state) => state.accentColor)
  const backgroundMode = useEditorStore((state) => state.backgroundMode)
  const setAccentColor = useEditorStore((state) => state.setAccentColor)
  const setBackgroundMode = useEditorStore((state) => state.setBackgroundMode)

  return (
    <div className="theme-panel">
      <div className="theme-color-row">
        <label className="field-block field-block--compact">
          <span className="field-label">
            <Palette size={14} />
            主强调色
          </span>
          <div className="color-input-wrap">
            <input
              type="color"
              value={accentColor}
              onChange={(event) => setAccentColor(event.target.value)}
            />
            <code>{accentColor.toUpperCase()}</code>
          </div>
        </label>
      </div>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={theme.id === backgroundMode ? 'theme-option theme-option--active' : 'theme-option'}
            onClick={() => setBackgroundMode(theme.id)}
          >
            <div>
              <strong>{theme.label}</strong>
              <p>{theme.hint}</p>
            </div>
            {theme.id === backgroundMode ? <Check size={16} /> : <Sparkles size={16} />}
          </button>
        ))}
      </div>
    </div>
  )
}
