import type { AssetSlot, TemplateId } from '../types/editor'

export interface TemplateAssetRequirement {
  slot: AssetSlot
  label: string
  hint: string
  required: boolean
}

export interface TemplateDefinition {
  id: TemplateId
  name: string
  summary: string
  scenario: string
  previewLabel: string
  intent: string
  assetRequirements: TemplateAssetRequirement[]
}

export const POSTER_WIDTH = 1600
export const POSTER_HEIGHT = 800

const optionalLogo: TemplateAssetRequirement = {
  slot: 'logo',
  label: '品牌 Logo',
  hint: 'Meegle 标识',
  required: false,
}

export const templates: TemplateDefinition[] = [
  {
    id: 'hero',
    name: '封面主视觉型',
    summary: '用一张主截图和一句话卖点，快速搭出品牌首屏。',
    scenario: '官网头图 / 活动首屏',
    previewLabel: '大图吸引 + 标题转化',
    intent: '先用最强主视觉抓住注意力，再用标题和 CTA 完成转化。',
    assetRequirements: [
      {
        slot: 'hero',
        label: '主视觉截图',
        hint: '首页、路线图或项目总览',
        required: true,
      },
      optionalLogo,
    ],
  },
  {
    id: 'highlights',
    name: '功能亮点型',
    summary: '围绕截图做解释标注，适合讲清楚一个核心模块。',
    scenario: '功能介绍 / 售前讲解',
    previewLabel: '截图 + 标注解释',
    intent: '围绕一个核心界面做解释说明，让用户快速理解功能价值。',
    assetRequirements: [
      {
        slot: 'primary',
        label: '核心功能截图',
        hint: '需求、任务或看板模块',
        required: true,
      },
      optionalLogo,
    ],
  },
  {
    id: 'cards',
    name: '多功能卡片型',
    summary: '在一张图里放下多个卖点，适合能力总览。',
    scenario: '能力总览 / 官网模块',
    previewLabel: '主图 + 三卡片',
    intent: '先展示产品主界面，再用卡片列出多个能力点。',
    assetRequirements: [
      {
        slot: 'primary',
        label: '产品主界面截图',
        hint: 'Meegle 工作空间总览',
        required: true,
      },
      optionalLogo,
    ],
  },
  {
    id: 'steps',
    name: '流程步骤型',
    summary: '把使用路径拆成 3 步，让复杂产品也容易理解。',
    scenario: '教程说明 / Onboarding',
    previewLabel: '流程分步说明',
    intent: '用截图做锚点，把操作流程拆成清晰的 3 个步骤。',
    assetRequirements: [
      {
        slot: 'primary',
        label: '流程演示截图',
        hint: '计划、协作、交付流程界面',
        required: true,
      },
      optionalLogo,
    ],
  },
  {
    id: 'compare',
    name: '前后对比型',
    summary: '突出传统方式和产品方案的差异，强调改造价值。',
    scenario: '方案对比 / 升级价值',
    previewLabel: '左右对比呈现',
    intent: '通过左右对比突出使用产品前后的差异和改造价值。',
    assetRequirements: [
      {
        slot: 'hero',
        label: '对比前素材',
        hint: '分散表格、邮件或旧流程',
        required: true,
      },
      {
        slot: 'primary',
        label: '对比后截图',
        hint: 'Meegle 中统一后的项目视图',
        required: true,
      },
      optionalLogo,
    ],
  },
  {
    id: 'metrics',
    name: '数据成果型',
    summary: '把效率、转化、上线周期这些结果直接亮出来。',
    scenario: 'ROI 展示 / 成果背书',
    previewLabel: '指标卡 + 截图',
    intent: '用一张截图和一组指标强调 ROI，适合销售和案例材料。',
    assetRequirements: [
      {
        slot: 'primary',
        label: '成果页面截图',
        hint: '项目洞察、交付数据或报表',
        required: true,
      },
      optionalLogo,
    ],
  },
  {
    id: 'devices',
    name: '多端展示型',
    summary: '同时展示桌面端和移动端，强化产品完整度。',
    scenario: '多端产品 / SaaS 工具',
    previewLabel: 'PC + 手机联动',
    intent: '同时展示桌面和移动端，强调多端一致体验。',
    assetRequirements: [
      {
        slot: 'primary',
        label: '桌面端截图',
        hint: 'Web 工作台',
        required: true,
      },
      {
        slot: 'secondary',
        label: '移动端截图',
        hint: '移动端工作台',
        required: true,
      },
      optionalLogo,
    ],
  },
  {
    id: 'case',
    name: '案例背书型',
    summary: '用客户声音和截图一起讲故事，增强可信度。',
    scenario: '案例宣传 / 客户故事',
    previewLabel: '客户评价 + 成果',
    intent: '用客户评价、结果指标和产品截图组合成可信的案例宣传图。',
    assetRequirements: [
      {
        slot: 'primary',
        label: '案例截图',
        hint: '客户项目空间或成果视图',
        required: true,
      },
      optionalLogo,
    ],
  },
]

export function getTemplateById(templateId: TemplateId) {
  return templates.find((item) => item.id === templateId) ?? templates[0]
}
