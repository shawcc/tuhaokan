import { Check, ImagePlus, Trash2, Upload } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { getTemplateById } from '../../data/templates'
import { useEditorStore } from '../../store/editorStore'
import type { AssetSlot } from '../../types/editor'
import { createAssetId, fileToDataUrl } from '../../utils/file'

export function AssetUploader() {
  const activeTemplate = useEditorStore((state) => state.activeTemplate)
  const assets = useEditorStore((state) => state.assets)
  const setAsset = useEditorStore((state) => state.setAsset)
  const clearAsset = useEditorStore((state) => state.clearAsset)
  const [error, setError] = useState('')

  const assetMap = Object.fromEntries(assets.map((item) => [item.slot, item]))
  const template = getTemplateById(activeTemplate)
  const requiredAssets = template.assetRequirements.filter((item) => item.required)
  const finishedRequiredCount = requiredAssets.filter((item) => assetMap[item.slot]).length

  const handleUpload =
    (slot: AssetSlot) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      try {
        const dataUrl = await fileToDataUrl(file)
        setAsset(slot, {
          id: createAssetId(slot),
          name: file.name,
          dataUrl,
        })
        setError('')
      } catch (uploadError) {
        const message = uploadError instanceof Error ? uploadError.message : '上传失败，请重试。'
        setError(message)
      } finally {
        event.target.value = ''
      }
    }

  return (
    <div className="asset-uploader">
      <div className="asset-guidance">
        <span>
          {finishedRequiredCount}/{requiredAssets.length}
        </span>
      </div>
      <div className="asset-grid">
        {template.assetRequirements.map((item) => {
          const currentAsset = assetMap[item.slot]
          const hasValue = Boolean(currentAsset)

          return (
            <label key={item.slot} className={hasValue ? 'asset-card asset-card--filled' : 'asset-card'}>
              <input type="file" accept="image/*" onChange={handleUpload(item.slot)} />
              <div className="asset-card__icon">{hasValue ? <ImagePlus size={18} /> : <Upload size={18} />}</div>
              <div>
                <strong>
                  {item.label}
                  {item.required ? <em>必需</em> : <em>可选</em>}
                </strong>
                <p>{hasValue ? currentAsset?.name : item.hint}</p>
              </div>
              {hasValue ? (
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`删除${item.label}`}
                  onClick={(event) => {
                    event.preventDefault()
                    clearAsset(item.slot)
                  }}
                >
                  <Trash2 size={16} />
                </button>
              ) : (
                <span className="asset-card__tag">
                  {item.required ? <Upload size={14} /> : <Check size={14} />}
                  上传
                </span>
              )}
            </label>
          )
        })}
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
    </div>
  )
}
