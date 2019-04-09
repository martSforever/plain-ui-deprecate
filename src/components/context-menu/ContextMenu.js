import PlContextMenu from './pl-context-menu'

class ContextMenu {
    Vue;
    instances = []
    curInstance;

    get instance() {
        let ret;
        for (let i = 0; i < this.instances.length; i++) {
            const ins = this.instances[i];
            if (ins !== this.curInstance && !ins.p_show) {
                ret = ins
                break
            }
        }
        if (!ret) {
            ret = new this.Vue(PlContextMenu).$mount()
            document.body.appendChild(ret.$el)
            this.instances.push(ret)
        }
        this.curInstance = ret
        return ret
    }

    constructor(Vue) {
        this.Vue = Vue
    }

    async pick({data, labelKey, valueKey, value, multiple, width = '150px', height = '200px', sizeEqual, el, event} = {}) {
        return new Promise((rs) => {
            this.instance.show({data, labelKey, valueKey, value, multiple, width, height, sizeEqual, el, event, onConfirm: rs})
        })
    }
}

export default ContextMenu