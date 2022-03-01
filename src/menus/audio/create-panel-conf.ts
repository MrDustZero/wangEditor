/**
 * @description video 菜单 panel tab 配置
 * @author tonghan
 */

import Editor from '../../editor/index'
import { PanelConf, PanelTabConf } from '../menu-constructors/Panel'
import { getRandom } from '../../utils/util'
import $ from '../../utils/dom-core'
import UploadVideo from './upload-video'

export default function (editor: Editor, video: string): PanelConf {
    const config = editor.config
    const uploadVideo = new UploadVideo(editor)

    // panel 中需要用到的id
    const inputIFrameId = getRandom('input-iframe')
    const btnOkId = getRandom('btn-ok')
    const inputUploadId = getRandom('input-upload')
    const btnStartId = getRandom('btn-local-ok')




    // tabs配置
    // const fileMultipleAttr = config.uploadVideoMaxLength === 1 ? '' : 'multiple="multiple"'
    const tabsConf: PanelTabConf[] = [
        {
            // tab 的标题
            title: editor.i18next.t('menus.panelMenus.video.上传音频'),
            tpl: `<div class="w-e-up-video-container">
                    <div id="${btnStartId}" class="w-e-up-btn">
                        <i class="w-e-icon-upload2"></i>
                    </div>
                    <div style="display:none;">
                        <input id="${inputUploadId}" type="file" accept="audio/*"/>
                    </div>
                 </div>`,
            events: [
                // 触发选择视频
                {
                    selector: '#' + btnStartId,
                    type: 'click',
                    fn: () => {
                        const $file = $('#' + inputUploadId)
                        const fileElem = $file.elems[0]
                        if (fileElem) {
                            fileElem.click()
                        } else {
                            // 返回 true 可关闭 panel
                            return true
                        }
                    },
                },
                // 选择视频完毕
                {
                    selector: '#' + inputUploadId,
                    type: 'change',
                    fn: () => {
                        const $file = $('#' + inputUploadId)
                        const fileElem = $file.elems[0]
                        if (!fileElem) {
                            // 返回 true 可关闭 panel
                            return true
                        }

                        // 获取选中的 file 对象列表
                        const fileList = (fileElem as any).files
                        if (fileList.length) {
                            uploadVideo.uploadVideo(fileList)
                        }

                        // 返回 true 可关闭 panel
                        return true
                    },
                },
            ],
        },
    ]

    const conf: PanelConf = {
        width: 300,
        height: 0,

        // panel 中可包含多个 tab
        tabs: [], // tabs end
    }

    conf.tabs.push(tabsConf[0])

    return conf
}
