import { configStore } from '@/stores'
/**
 * 自动片接图片路径
 * @param videos
 * @param height 视频高度
 * @param width 视频宽度
 * @returns {*|string}
 */
export const VideoPath = (videos: any, height = 0, width = 0) => {
  let path
  if (Array.isArray(videos) && videos.length > 0) {
    path = videos[0]
  } else {
    path = videos
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
  if (disk.resize) {
    newPath = newPath + `?x-oss-process=video/snapshot,t_2000,w_60,h_60,f_jpg,m_fast`
  }

  if (height || width) {
    newPath = newPath.replaceAll('${h}', height)
    newPath = newPath.replaceAll('${w}', width)
  }
  console.log(newPath)
  return newPath
}
