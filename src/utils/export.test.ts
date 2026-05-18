import { describe, expect, it } from 'vitest'
import { createDownloadName } from './export'

describe('createDownloadName', () => {
  it('移除文件名中的非法字符', () => {
    expect(createDownloadName('  星云/经营助手:*?  ')).toBe('星云经营助手')
  })

  it('为空时返回默认名称', () => {
    expect(createDownloadName('   ')).toBe('tuhaokan-poster')
  })
})
