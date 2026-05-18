import { ArrowLeft, Download, LayoutPanelLeft, PanelsTopLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AssetUploader } from '../components/editor/AssetUploader'
import { SidebarSection } from '../components/editor/SidebarSection'
import { TemplateRail } from '../components/editor/TemplateRail'
import { TextFieldsPanel } from '../components/editor/TextFieldsPanel'
import { ThemePanel } from '../components/editor/ThemePanel'
import { PosterCanvas } from '../components/poster/PosterCanvas'
import { getTemplateById, POSTER_HEIGHT, POSTER_WIDTH } from '../data/templates'
import { useEditorStore } from '../store/editorStore'
import { exportPosterAsPng } from '../utils/export'

export function EditorPage() {
  const content = useEditorStore((state) => state.content)
  const activeTemplate = useEditorStore((state) => state.activeTemplate)
  const template = getTemplateById(activeTemplate)
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
      <header className="editor-topbar">
        <div>
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            tuhaokan
          </Link>
          <h1>{content.brandName || '产品'} 宣传图</h1>
          <p>{template.name}</p>
        </div>
        <div className="editor-topbar__actions">
          <span className="topbar-badge">
            <PanelsTopLeft size={14} />
            {POSTER_WIDTH} x {POSTER_HEIGHT}
          </span>
          <button type="button" className="primary-button" onClick={handleDownload}>
            <Download size={16} />
            {isExporting ? '导出中...' : '下载 PNG'}
          </button>
        </div>
      </header>

      <section className="editor-layout">
        <aside className="editor-rail">
          <TemplateRail />
        </aside>

        <section className="preview-shell">
          <div className="preview-shell__header">
            <div>
              <span className="section-eyebrow">1600 × 800</span>
              <h2>{content.title}</h2>
            </div>
          </div>
          <div className="poster-frame">
            <div ref={canvasRef} className="poster-frame__canvas">
              <PosterCanvas />
            </div>
          </div>
        </section>

        <aside className="editor-sidebar">
          <SidebarSection
            eyebrow="素材"
            title="图片"
          >
            <AssetUploader />
          </SidebarSection>

          <SidebarSection
            eyebrow="样式"
            title="主题"
            action={
              <span className="pill-status">
                <LayoutPanelLeft size={14} />
                {POSTER_WIDTH} × {POSTER_HEIGHT}
              </span>
            }
          >
            <ThemePanel />
          </SidebarSection>

          <SidebarSection
            eyebrow="文案"
            title="内容"
          >
            <TextFieldsPanel />
          </SidebarSection>
        </aside>
      </section>
    </main>
  )
}
