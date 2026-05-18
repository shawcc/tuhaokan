import { create } from 'zustand'
import type {
  AssetSlot,
  BackgroundMode,
  HighlightItem,
  PosterContent,
  TemplateId,
  UploadedAsset,
} from '../types/editor'

function createInitialHighlights(): HighlightItem[] {
  return [
    {
      id: 'highlight-1',
      title: '项目、需求、迭代一体化',
      description: '从业务目标到研发任务自动串联，让产品和工程团队始终围绕同一个计划推进。',
    },
    {
      id: 'highlight-2',
      title: '跨团队协作空间',
      description: '评论、文档、排期和状态沉淀在同一个上下文里，减少会议和反复确认。',
    },
    {
      id: 'highlight-3',
      title: '可视化进度追踪',
      description: '用路线图、看板和数据报表同步展示风险、依赖和交付节奏。',
    },
  ]
}

function createInitialContent(): PosterContent {
  return {
    brandName: 'Meegle',
    title: '让复杂项目从目标到交付始终保持清晰',
    subtitle:
      'Meegle 面向产品、研发、交付和运营团队，把需求管理、项目计划、协作沟通和数据洞察整合到一个工作空间。',
    ctaText: '了解 Meegle 工作空间',
    scene: '适用于多产品线研发、客户交付项目、跨部门协同、敏捷迭代和业务目标追踪。',
    badges: ['项目协同平台', '目标到交付闭环', '企业级工作空间'],
    metrics: ['需求流转提速 42%', '跨团队会议减少 31%', '交付风险提前发现'],
    highlights: createInitialHighlights(),
    customerName: 'Meegle 客户案例',
    quote: 'Meegle 让我们的产品、研发和交付团队终于在同一张地图上协作，每个版本的目标、风险和进展都清楚可见。',
  }
}

export interface EditorStore {
  activeTemplate: TemplateId
  accentColor: string
  backgroundMode: BackgroundMode
  assets: UploadedAsset[]
  content: PosterContent
  setTemplate: (templateId: TemplateId) => void
  setAccentColor: (color: string) => void
  setBackgroundMode: (mode: BackgroundMode) => void
  setAsset: (slot: AssetSlot, asset: Omit<UploadedAsset, 'slot'>) => void
  clearAsset: (slot: AssetSlot) => void
  updateField: <K extends keyof PosterContent>(key: K, value: PosterContent[K]) => void
  updateBadge: (index: number, value: string) => void
  updateMetric: (index: number, value: string) => void
  updateHighlight: (index: number, key: keyof HighlightItem, value: string) => void
  resetDemo: () => void
}

const initialAccent = '#5eead4'
const initialBackgroundMode: BackgroundMode = 'paper'

export const useEditorStore = create<EditorStore>((set) => ({
  activeTemplate: 'hero',
  accentColor: initialAccent,
  backgroundMode: initialBackgroundMode,
  assets: [],
  content: createInitialContent(),
  setTemplate: (templateId) => set({ activeTemplate: templateId }),
  setAccentColor: (color) => set({ accentColor: color }),
  setBackgroundMode: (mode) => set({ backgroundMode: mode }),
  setAsset: (slot, asset) =>
    set((state) => ({
      assets: [...state.assets.filter((item) => item.slot !== slot), { ...asset, slot }],
    })),
  clearAsset: (slot) =>
    set((state) => ({
      assets: state.assets.filter((item) => item.slot !== slot),
    })),
  updateField: (key, value) =>
    set((state) => ({
      content: {
        ...state.content,
        [key]: value,
      },
    })),
  updateBadge: (index, value) =>
    set((state) => ({
      content: {
        ...state.content,
        badges: state.content.badges.map((item, itemIndex) =>
          itemIndex === index ? value : item,
        ),
      },
    })),
  updateMetric: (index, value) =>
    set((state) => ({
      content: {
        ...state.content,
        metrics: state.content.metrics.map((item, itemIndex) =>
          itemIndex === index ? value : item,
        ),
      },
    })),
  updateHighlight: (index, key, value) =>
    set((state) => ({
      content: {
        ...state.content,
        highlights: state.content.highlights.map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [key]: value,
              }
            : item,
        ),
      },
    })),
  resetDemo: () =>
    set({
      activeTemplate: 'hero',
      accentColor: initialAccent,
      backgroundMode: initialBackgroundMode,
      assets: [],
      content: createInitialContent(),
    }),
}))
