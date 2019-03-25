import PlContextMenu from './pl-context-menu'

class ContextMenu {
    Vue;
    instance;

    constructor(Vue) {
        this.Vue = Vue
        this.Vue.prototype.$nextTick(() => {
            this.instance = new this.Vue(PlContextMenu).$mount()
            document.body.appendChild(this.instance.$el)
        })
    }

    async pick({data, labelKey, valueKey, value, multiple, width, height, el, event} = {}) {
        return new Promise((rs) => {
            Object.assign(this.instance, {data, labelKey, valueKey, value, multiple, width, height, el, event}, {onConfirm: rs})
            this.instance.show = true
        })
    }
}

export default ContextMenu