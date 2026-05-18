import { Check, Palette } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import type { BackgroundMode } from '../../types/editor'

const themes: { id: BackgroundMode; label: string }[] = [
  { id: 'midnight', label: '深色舞台' },
  { id: 'aurora', label: '极光背景' },
  { id: 'paper', label: '浅色商务' },
]

export function ThemePanel() {
  const accentColor = useEditorStore((state) => state.accentColor)
  const backgroundMode = useEditorStore((state) => state.backgroundMode)
  const setAccentColor = useEditorStore((state) => state.setAccentColor)
  const setBackgroundMode = useEditorStore((state) => state.setBackgroundMode)

  return (
    <div className="theme-toolbar">
      <div className="theme-toolbar__modes">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={theme.id === backgroundMode ? 'theme-toolbar__mode theme-toolbar__mode--active' : 'theme-toolbar__mode'}
            onClick={() => setBackgroundMode(theme.id)}
          >
            {theme.label}
            {theme.id === backgroundMode ? <Check size={14} /> : null}
          </button>
        ))}
      </div>
      <div className="theme-options">
        <label className="theme-toolbar__color">
          <Palette size={14} />
          <input
            type="color"
            value={accentColor}
            onChange={(event) => setAccentColor(event.target.value)}
          />
        </label>
      </div>
    </div>
  )
}
