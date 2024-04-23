import { configStore } from '@/stores'

/**
 * 自动片接图片路径
 * @param images
 * @param height 图片高度
 * @param width 图片宽度
 * @returns {*|string}
 */
export const ImagePath = (images: any, height?: number, width?: number) => {
  let path
  if (Array.isArray(images) && images.length > 0) {
    path = images[0]
  } else {
    path = images
  }
  if (!path) {
    return path
  }
  if (/^http|base64/.test(path)) {
    return path
  }

  const po = path.split('://')

  if (!configStore.disk[po[0]]) {
    return
  }

  const disk = JSON.parse(JSON.stringify(configStore.disk[po[0]]))

  let newPath = disk.url + po[1]

  if (height || width) {
    if (disk.resize) {
      newPath = newPath + disk.resize
    }
    newPath = newPath.replaceAll('${h}', height)
    newPath = newPath.replaceAll('${w}', width)
  }

  return newPath
}

/**
 * 获取图片高度
 * @param images  图片路径
 * */
export const getImageHeight = (images: any) => {
  if (!images) {
    return Promise.resolve('180px')
  }
  return new Promise((resolve) => {
    const img = new Image()
    img.src = ImagePath(images)
    img.onload = () => {
      console.log(img.height, 'img.height')
      const height = img.height + 'px'

      resolve(height)
    }
    // img.onerror = () => {
    //   // 处理图片加载错误的情况
    //   resolve('180px')
    // }
  })
}
