import defaultSettings from '@/settings'

const title = defaultSettings.title || 'C认证品牌官网后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
