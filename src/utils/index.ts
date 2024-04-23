import type { FormInstance } from 'element-plus'

/**
 * 验证码表单.
 * @param formRef
 */
export const validateForm = (formRef?: FormInstance) => {
  return new Promise((resolve, reject) => {
    if (!formRef) {
      reject(false)
    }
    formRef?.validate((valid) => {
      if (valid) {
        resolve(valid)
      } else {
        reject(valid)
      }
    })
  })
}

/**
 * 是否全屏。
 */
export const isFullscreen = () => {
  const doc: any = window.document
  return !!(
    doc.webkitIsFullScreen ||
    doc.mozFullScreen ||
    doc.msFullscreenElement ||
    doc.fullscreenElement
  )
}

/**
 * 退出全屏.
 */
export const exitFullscreen = () => {
  const doc: any = window.document
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen()
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen()
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen()
  }
}

/**
 * 请求全屏.
 */
export const requestFullscreen = () => {
  const element: any = window.document.documentElement
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  }
}

/**
 * 获取数据.
 * @param obj
 * @param key
 * @param defaultVal
 */
export const data_get = (obj: any, key: string, defaultVal: any = '') => {
  if (!obj) {
    return defaultVal
  }
  const keys = key.split('.')
  let result = obj
  for (const key of keys) {
    result = result[key]
    if (!result) {
      return defaultVal
    }
  }
  return result
}

/**
 * 计算文件大小
 * @param size
 */
export const calcFileSize = (size: number) => {
  if (!size) {
    return '0 Bytes'
  }
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(size) / Math.log(k))
  return (size / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}

/**
 * 是否图片.
 * @param path
 */
export const isImage = (path?: string) => {
  if (!path) {
    return false
  }
  const ext = path.split('.').pop()?.toLowerCase()
  return ['png', 'jpg', 'jpeg', 'gif'].includes(ext || '')
}
