import $utils from '../../../src/scripts/utils'
import {ValidMixin} from "../../mixin/component-mixin";

export const ColumnProps = {
    title: {type: String},                                                                                          //列标题
    field: {type: String},                                                                                          //列绑定的字段
    width: {default: 200},                                                                                          //列宽度
    fit: {type: Number, default: 0},                                                                                //当列不满表格宽度时，该列所占剩下宽度的权重
    order: {type: Number, default: 0},                                                                              //列排序
    fixed: {type: String, default: 'center', validator: val => $utils.oneOf(val, ['left', 'center', 'right'])},     //固定列位置
    search: {type: Boolean, default: true},                                                                         //可查询
    sort: {type: Boolean, default: true},                                                                           //可排序
    quickFilter: {type: Boolean, default: false},                                                                   //可快速筛选，仅值列表列有效
    filterName: {type: String, default: 'input'},                                                                   //筛选组件名称
    filterOption: {type: Object},                                                                                   //筛选参数
    lov: {type: String},                                                                                            //值列表类型
    placeLeft: {type: Boolean},                                                                                     //当出现左滚动列的时候，是否自动设置为左固定列
    placeRight: {type: Boolean},                                                                                    //当出现右滚动列的时候，是否自动设置为右固定列
    align: {type: String, default: 'left'},                                                                         //非编辑状态下文本对其方式
    editable: {type: Boolean, default: true},                                                                       //是否可编辑
    hide: {type: Boolean},                                                                                          //是否隐藏
    disabledConfig: {type: Boolean},                                                                                //禁止配置改列
    disabledFormEdit: {type: Boolean},                                                                              //禁止在form表单中编辑
    disabledBatchModify: {type: Boolean},                                                                           //禁止批量修改

    dataType: {type: String},                                                                                       //数据格式化方式:tel,cny,money,percent
    tooltip: {type: Boolean},                                                                                       //是否tooltip显示文本
    link: {type: Boolean},                                                                                          //是否以超链接的形式展示文本，并且点击的时候回派发事件
    clickWhenIneditable: {type: Boolean, default: true},                                                            //只有非编辑状态下才能出发点击事件，否则任何状态都会触发点击事件
    showInDialog: {type: Boolean},                                                                                  //非编辑状态下是否点击后再dialog中显示

    editableFunc: {type: Function},                                                                                 //是否可编辑判断函数
    requiredFunc: {type: Function},                                                                                 //是否必输
}

export const refreshProps = [
    'fit',
    'order',
    'fixed,',
    'placeLeft',
    'placeRight',
    'hide',
    'disabledConfig',
]

export const ColumnMixin = {
    mixins: [ValidMixin],
    props: ColumnProps,
    computed: {
        columnBinding() {
            const ret = Object.keys(ColumnProps).reduce((ret, key) => {
                ret[key] = this[key]
                return ret
            }, {})
            ret.titleScopedSlot = this.$scopedSlots.title
            return ret
        },
        columnItemBinding() {
            return {
                field: this.field,
                editable: this.editable,
                align: this.align,
                dataType: this.dataType,
                tooltip: this.tooltip,
                link: this.link,
                scopeSlotFunc: this.$scopedSlots.default,
                required: this.required,
                rules: this.rules,
                validOnInit: this.validOnInit,
                editableFunc: this.editableFunc,
                requiredFunc: this.requiredFunc,
            }
        },
    },
    methods: {
        /**
         * 点击子行动作事件
         * @author  韦胜健
         * @date    2019/1/10 17:45
         */
        p_clickItem({row, editRow, rowIndex, field, editable}) {
            if (!editable && this.showInDialog) this.$dialog.show(row[field])
            if (!!this.clickWhenIneditable && !!editable) return
            this.$emit('click', {row, editRow, rowIndex, field, editable})
        },
        col() {
            return this.$refs.column.col();
        },
    }
}

export const ColumnItemMixin = {
    mixins: [ValidMixin],
    props: {
        row: {},                                                                                                        //行数据对象
        editRow: {},                                                                                                    //行编辑数据对象
        rowIndex: {},                                                                                                   //行数据索引
        col: {},                                                                                                        //单元格渲染列
        colIndex: {},                                                                                                   //单元格索引
        field: {},                                                                                                      //列绑定字段
        editable: {type: Boolean, default: true},                                                                       //是否可编辑
        align: {type: String, default: 'left'},                                                                         //非编辑状态下文本对其方式
        dataType: {type: String},                                                                                       //数据格式化方式:tel,cny,money,percent
        tooltip: {type: Boolean},                                                                                       //是否tooltip显示文本
        link: {type: Boolean},                                                                                          //是否以超链接的形式展示文本，并且点击的时候回派发事件
        scopeSlotFunc: {type: Function},                                                                                //渲染文本的渲染函数

        editableFunc: {type: Function},                                                                                 //是否可编辑判断函数
        requiredFunc: {type: Function},                                                                                 //是否必输
    },
    data() {
        return {
            currentEditable: false,                                                                                     //当前行是否被设置为可编辑
            p_controller: null,                                                                                         //pl-table-cell-controller
            controllerEditable: null,                                                                                   //controller是否指明是否可编辑
            controllerRequired: null,                                                                                   //controller是否指明required
        }
    },
    computed: {
        /**
         * 当前是否可编辑
         * @author  韦胜健
         * @date    2019/1/10 15:31
         */
        p_editable() {
            if (this.rowIndex == null && this.colIndex == null) return
            if (this.controllerEditable != null) return this.controllerEditable
            const editable = this.currentEditable && this.editable
            return editable && (!this.editableFunc || this.editableFunc(this.p_data))
        },
        /**
         * 当前是否必输
         * @author  韦胜健
         * @date    2019/1/18 15:59
         */
        p_required() {
            if (this.rowIndex == null && this.colIndex == null) return
            if (this.controllerRequired != null) return this.controllerRequired
            return !!this.requiredFunc ? this.requiredFunc(this.p_data) : this.required
        },
        /**
         * 用于判断常用参数
         * @author  韦胜健
         * @date    2019/1/18 16:35
         */
        p_data() {
            return {
                row: this.row,
                editRow: this.editRow,
                rowIndex: this.rowIndex,
                field: this.field
            }
        },
        /**
         * 当前应该展示数据的row
         * @author  韦胜健
         * @date    2019/1/11 10:52
         */
        showRow() {
            return this.p_editable ? this.editRow : this.row
        },
    },
    mounted() {
        this.p_controller = this.$plain.$dom.findComponentUpward(this, 'pl-table-cell-controller')
        if (!!this.p_controller) this.rowIndex != null && this.colIndex != null && this.p_controller.p_add(this)
    },
    beforeDestroy() {
        !!this.p_controller && this.p_controller.p_remove(this)
    },
    methods: {
        /**
         * 开启编辑状态
         * @author  韦胜健
         * @date    2019/1/8 10:21
         */
        enableEdit() {
            this.currentEditable = true
        },
        /**
         * 关闭编辑状态
         * @author  韦胜健
         * @date    2019/1/8 10:21
         */
        disableEdit() {
            this.currentEditable = false
        },
    }
}

export class TableColumn {
    constructor(context) {
        // console.log('new TableColumn', context.title)
        const originalProps = Object.keys(ColumnProps).reduce((ret, key) => {
            // context.$set(ret, key, context[key])
            ret[key] = context[key]
            return ret
        }, {})
        originalProps.width = context.$plain.$utils.removePx(originalProps.width)
        this.originalProps = originalProps
        this.colScopedSlot = context.$scopedSlots.default
        this.titleScopedSlot = context.titleScopedSlot || context.$scopedSlots.title
        Object.assign(this, originalProps)
    }
}

export const ColumnGroupProps = {
    title: {},                                  //多级表头标题
    order: {type: Number, default: 0},          //多级表头排序序号
    fixed: {type: String, default: 'center'},   //多级表头固定位置
    placeLeft: {type: Boolean},                 //当出现左滚动列的时候，是否自动设置为左固定列
    placeRight: {type: Boolean},                //当出现右滚动列的时候，是否自动设置为右固定列

    isCtrlGroup: {type: Boolean},               //是否为列控制器服务
}

export class TableColumnGroup {
    constructor(context) {
        const originalProps = Object.keys(ColumnGroupProps).reduce((ret, key) => {
            // context.$set(ret, key, context[key])
            ret[key] = context[key]
            return ret
        }, {})
        this.originalProps = originalProps
        Object.assign(this, originalProps)
    }
}