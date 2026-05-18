import { templates } from '../../data/templates'
import { useEditorStore } from '../../store/editorStore'
import type { TemplateId } from '../../types/editor'

function TemplatePreview({ templateId }: { templateId: TemplateId }) {
  return (
    <div className={`template-preview template-preview--${templateId}`} aria-hidden="true">
      <div className="template-preview__brand" />
      {templateId === 'highlights' ? (
        <>
          <div className="template-preview__screen" />
          <div className="template-preview__pins">
            <span />
            <span />
            <span />
          </div>
        </>
      ) : null}
      {templateId === 'cards' ? (
        <>
          <div className="template-preview__headline" />
          <div className="template-preview__screen" />
          <div className="template-preview__cards">
            <span />
            <span />
            <span />
          </div>
        </>
      ) : null}
      {templateId === 'steps' ? (
        <>
          <div className="template-preview__screen" />
          <div className="template-preview__steps">
            <span />
            <span />
            <span />
          </div>
        </>
      ) : null}
      {templateId === 'compare' ? (
        <div className="template-preview__compare">
          <span />
          <span />
        </div>
      ) : null}
      {templateId === 'metrics' ? (
        <>
          <div className="template-preview__metrics">
            <span />
            <span />
            <span />
          </div>
          <div className="template-preview__screen" />
        </>
      ) : null}
      {templateId === 'devices' ? (
        <div className="template-preview__devices">
          <span />
          <span />
        </div>
      ) : null}
      {templateId === 'case' ? (
        <>
          <div className="template-preview__quote" />
          <div className="template-preview__screen" />
          <div className="template-preview__result" />
        </>
      ) : null}
    </div>
  )
}

export function TemplateRail() {
  const activeTemplate = useEditorStore((state) => state.activeTemplate)
  const setTemplate = useEditorStore((state) => state.setTemplate)

  return (
    <div className="template-rail">
      <div className="template-rail__list">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            className={template.id === activeTemplate ? 'template-item template-item--active' : 'template-item'}
            onClick={() => setTemplate(template.id)}
          >
            <TemplatePreview templateId={template.id} />
            <strong>{template.name}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}
