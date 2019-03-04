import PlContextMenu from './pl-context-menu'

class ContextMenu {
    Vue;
    _instance;

    get instance() {
        if (!this._instance) {
            this._instance = new this.Vue(PlContextMenu).$mount()
            document.body.appendChild(this._instance.$el)
        }
        return this._instance
    }

    constructor(Vue) {
        this.Vue = Vue
    }

    async pick({data, labelKey, valueKey, value, multiple, width, height, el, event} = {}) {
        return new Promise((rs) => {
            Object.assign(this.instance, {data, labelKey, valueKey, value, multiple, width, height, el, event}, {onConfirm: rs})
            this.Vue.prototype.$nextTick(() => {
                this.instance.show = true
            })
        })
    }
}

export default ContextMenu