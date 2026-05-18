import { Download } from 'lucide-react'
import { useRef, useState } from 'react'
import { TemplateRail } from '../components/editor/TemplateRail'
import { ThemePanel } from '../components/editor/ThemePanel'
import { PosterCanvas } from '../components/poster/PosterCanvas'
import { useEditorStore } from '../store/editorStore'
import { exportPosterAsPng } from '../utils/export'

export function EditorPage() {
  const content = useEditorStore((state) => state.content)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = async () => {
    if (!canvasRef.current || isExporting) {
      return
    }

    setIsExporting(true)
    try {
      await exportPosterAsPng(canvasRef.current, content.brandName || 'tuhaokan')
    } catch (error) {
      console.error(error)
      window.alert('导出失败，请稍后重试。')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <main className="page-shell page-shell--editor">
      <section className="editor-layout">
        <aside className="editor-rail">
          <TemplateRail />
        </aside>

        <section className="preview-shell">
          <div className="preview-shell__topbar">
            <span className="preview-shell__brand">图好看</span>
            <div className="preview-shell__actions">
              <ThemePanel />
              <button type="button" className="primary-button" onClick={handleDownload}>
                <Download size={16} />
                {isExporting ? '导出中...' : '下载 PNG'}
              </button>
            </div>
          </div>
          <div className="poster-frame">
            <div ref={canvasRef} className="poster-frame__canvas">
              <PosterCanvas />
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
