import { ArrowRight, Download, ImageUp, LayoutTemplate, MonitorSmartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { templates } from '../data/templates'

const featureSteps = [
  {
    title: '上传产品截图',
    description: '支持主视觉、产品主截图、第二张对比图和品牌 Logo。',
    icon: ImageUp,
  },
  {
    title: '选择模板微调',
    description: '在 8 类模板中切换，并替换标题、卖点、指标与场景文案。',
    icon: LayoutTemplate,
  },
  {
    title: '下载固定成品',
    description: '输出尺寸固定为 1600 x 800，适合官网、销售资料和活动页。',
    icon: Download,
  },
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="page-shell page-shell--home">
      <section className="landing-hero">
        <div className="landing-hero__copy">
          <span className="section-eyebrow">tuhaokan</span>
          <h1>帮 ISV 把产品截图快速变成可直接对外发送的宣传图</h1>
          <p>
            首版围绕固定尺寸 `1600 x 800` 的宣传图制作，适合官网模块、销售资料、活动落地页和解决方案介绍。
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-button primary-button--large" onClick={() => navigate('/editor')}>
              开始制作
              <ArrowRight size={16} />
            </button>
            <span className="hero-note">上传截图、切换模板、实时预览、导出 PNG</span>
          </div>
        </div>
        <div className="landing-stage-card">
          <div className="landing-stage-card__badge">
            <MonitorSmartphone size={16} />
            固定输出 1600 x 800
          </div>
          <div className="landing-stage-card__stack">
            <article>
              <small>模板数</small>
              <strong>8</strong>
              <span>围绕官网、案例、功能、流程等常见宣传场景</span>
            </article>
            <article>
              <small>操作路径</small>
              <strong>3 步</strong>
              <span>上传素材、微调图文、下载成品</span>
            </article>
            <article>
              <small>适用人群</small>
              <strong>ISV</strong>
              <span>市场、售前、运营、产品团队都能直接上手</span>
            </article>
          </div>
        </div>
      </section>

      <section className="template-showcase">
        <div className="section-title-row">
          <div>
            <span className="section-eyebrow">模板范围</span>
            <h2>首版上线 8 类模板骨架</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => navigate('/editor')}>
            进入编辑台
          </button>
        </div>
        <div className="template-grid">
          {templates.map((template) => (
            <article key={template.id} className="template-showcase-card">
              <div className="template-showcase-card__header">
                <span>{template.name}</span>
                <small>{template.scenario}</small>
              </div>
              <strong>{template.previewLabel}</strong>
              <p>{template.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="steps-section">
        <div className="section-title-row section-title-row--compact">
          <div>
            <span className="section-eyebrow">使用流程</span>
            <h2>不做复杂设计系统，先把“出图速度”做对</h2>
          </div>
        </div>
        <div className="step-grid">
          {featureSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="step-showcase-card">
                <div className="step-showcase-card__topline">
                  <span>0{index + 1}</span>
                  <Icon size={18} />
                </div>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
