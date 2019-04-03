import PlMessageContainer from './pl-message-container'
import utils from '../../utils/utils'
import dom from '../../utils/dom'

class MessageService {
    _el;
    Vue;
    containers = {}

    get el() {
        if (!this._el) {
            this._el = document.createElement('div')
            dom.addClass(this._el, 'pl-message-containers')
            document.body.appendChild(this._el)
        }
        return this._el
    }

    constructor(Vue) {
        this.Vue = Vue
    }

    newInstance(horizontal, vertical) {
        const instance = new this.Vue(PlMessageContainer).$mount()
        instance.p_horizontal = horizontal
        instance.p_vertical = vertical
        this.el.appendChild(instance.$el)
        return instance
    }

    /**
     * 显示提示消息
     * @author  韦胜健
     * @date    2018/12/24 09:58
     * @param id                    显示的消息自动生成的id
     * @param horizontal            显示消息的横向位置
     * @param vertical              显示消息的纵向位置
     * @param type                  显示消息的类型
     * @param time                  显示消息自定关闭的时间
     * @param done                  显示的消息自动关闭触发的动作
     * @param click                 显示的消息点击触发动作
     * @param message               显示消息的文本内容
     */
    show(message, {
        id,
        horizontal = 'center',
        vertical = 'start',
        type = 'black',
        time = 3000,
        done,
        click,
    } = {}) {
        const position = `${horizontal}-${vertical}`
        const container = this.containers[position] || this.newInstance(horizontal, vertical)
        if (!this.containers[position]) this.containers[position] = container
        const messageOption = {
            id: id || utils.uuid(),
            text: message,
            type,
            time,
            done,
            click,
            horizontal,
            vertical,
        }
        this.Vue.prototype.$nextTick(() => container.add(messageOption))
        return messageOption
    }

    close(messageOption) {
        this.containers[`${messageOption.horizontal}-${messageOption.vertical}`].remove(messageOption)
    }
}

export {
    MessageService
}