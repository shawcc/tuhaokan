import { describe, expect, it } from 'vitest'
import { getTemplateById, templates } from './templates'
import type { TemplateId } from '../types/editor'

describe('templates', () => {
  it('首版包含 7 个模板', () => {
    expect(templates).toHaveLength(7)
  })

  it('未知模板 id 时回退到默认模板', () => {
    expect(getTemplateById('unknown' as TemplateId).id).toBe('highlights')
  })
})
