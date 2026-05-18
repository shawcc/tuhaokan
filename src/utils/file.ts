const FILE_SIZE_LIMIT = 10 * 1024 * 1024

export async function fileToDataUrl(file: File) {
  if (file.size > FILE_SIZE_LIMIT) {
    throw new Error('图片大小不能超过 10MB，请压缩后再上传。')
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('文件读取失败，请重试。'))
    reader.readAsDataURL(file)
  })
}

export function createAssetId(slot: string) {
  return `${slot}-${Date.now()}`
}
