/**
 * @description 视频相关的配置
 * @author hutianhao
 */

import Editor from '../editor/index'
import { EMPTY_FN } from '../utils/const'
import { ResType } from '../menus/audio/upload-video'

export type UploadAudioHooksType = {
    before?: (
        xhr: XMLHttpRequest,
        editor: Editor,
        files: File[]
    ) => { prevent: boolean; msg: string } | void
    success?: (xhr: XMLHttpRequest, editor: Editor, result: ResType) => void
    fail?: (xhr: XMLHttpRequest, editor: Editor, err: ResType | string) => void
    error?: (xhr: XMLHttpRequest, editor: Editor) => void
    timeout?: (xhr: XMLHttpRequest, editor: Editor) => void
    customInsert?: (
        inserAudio: (this: Editor, src: string) => void,
        result: ResType,
        editor: Editor
    ) => void
}

export default {
    // 插入网络视频前的回调函数
    onlineAudioCheck: (video: string): string | boolean => {
        return true
    },

    // 插入网络视频成功之后的回调函数
    onlineAudioCallback: EMPTY_FN,

    // 显示“插入视频”
    showLinkAudio: true,

    // accept
    uploadAudioAccept: ['mp3'],

    // 服务端地址
    uploadAudioServer: '',

    // 上传视频的最大体积，默认 1024M
    uploadAudioMaxSize: 1 * 1024 * 1024 * 1024,

    // 一次最多上传多少个视频
    // uploadVideoMaxLength: 2,

    // 自定义上传视频的名称
    uploadAudioName: '',

    // 上传视频自定义参数
    uploadAudioParams: {},

    // 自定义参数拼接到 url 中
    uploadAudioParamsWithUrl: false,

    // 上传视频自定义 header
    uploadAudioHeaders: {},

    // 钩子函数
    uploadAudioHooks: {},

    // 上传视频超时时间 ms 默认2个小时
    uploadAudioTimeout: 1000 * 60 * 60 * 2,

    // 跨域带 cookie
    withVideoCredentials: false,

    // 自定义上传
    customUploadAudio: null,

    // 自定义插入视频
    customInsertAudio: null,
}
