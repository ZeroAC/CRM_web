import { ossGetSign } from '@/api/upload'
import { randomNum } from '@/utils'
import { hostUrl } from '@/utils/constant'

/**
 * file 文件 file类型
 * path 文件上传路径（包含文件名）
 */
const uploadFile = async({ path, file }) => {
    // 获取oss参数
    const params = {
        'file_type': 'image',
        'file_dir': path
    }

    const res = await ossGetSign(params)
    // 执行
    const { accessid, policy, signature } = res.ResultData
    // const suffix = file.name.split('.').slice(-1)[0]
    const suffix = 'png'
    const filename = `${new Date().getTime()}${randomNum(10000, 99999)}.${suffix}`
    const aliyunFileKey = `${path}${filename}`
    const formData = new FormData()
    formData.append('key', aliyunFileKey)
    formData.append('policy', policy)
    formData.append('OSSAccessKeyId', accessid)
    formData.append('signature', signature)
    formData.append('success_action_status', 200)
    formData.append('file', file)
    // 请求阿里云oos
    const AliData = await fetch(hostUrl, {
        method: 'POST',
        body: formData
    })
    // 上传成功
    if (AliData.ok) {
        return `${hostUrl}/${aliyunFileKey}`
    }
    return false
}
export default uploadFile
