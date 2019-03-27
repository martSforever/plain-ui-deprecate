import LinkTableFormDialog from './link-table-form-dialog'

export default class TableFromDialog {
    Vue;
    instance;

    constructor(Vue) {
        this.Vue = Vue
        this.Vue.prototype.$nextTick(() => {
            this.instance = new Vue(LinkTableFormDialog).$mount()
            document.body.appendChild(this.instance.$el)
        })
    }

    /**
     * 弹出表格表单编辑对话框
     * @author  韦胜健
     * @date    2019/3/26 09:25
     * @param   row                 编辑行原数据
     * @param   editRow             编辑行编辑数据
     * @param   rowIndex            行索引
     * @param   onConfirm           点击确定时触发动作
     * @param   onCancel            点击取消时触发动作
     * @param   labelWidth          表单文本宽度
     * @param   editable            为true|false表示强制设置表单中的元素的编辑状态，为null则表示不控制
     * @param   required            为true|false表示强制设置表单中的元素的必输状态，为null则表示不控制
     * @param   columns             列数组数据
     */
    pick({row, editRow, rowIndex, onConfirm, onCancel, labelWidth = '100px', editable = null, required = null, columns,}) {
        row = this.Vue.prototype.$plain.$utils.deepCopy(row)
        editRow = this.Vue.prototype.$plain.$utils.deepCopy(editRow)
        Object.assign(this.instance, {row, editRow, rowIndex, onConfirm, onCancel, labelWidth, editable, required})
        this.instance.columns = [...columns]
        this.instance.p_show = true
    }

}
