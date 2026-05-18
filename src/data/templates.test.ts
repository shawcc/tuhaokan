import { describe, expect, it } from 'vitest'
import { getTemplateById, templates } from './templates'

describe('templates', () => {
  it('首版包含 8 个模板', () => {
    expect(templates).toHaveLength(8)
  })

  it('未知模板 id 时回退到默认模板', () => {
    expect(getTemplateById('hero').id).toBe('hero')
  })
})
