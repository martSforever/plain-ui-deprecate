import $utils from '../../utils/utils'
import {ValidMixin} from "../../mixin/component-mixin";

export const ColumnMixin = {
    mixins: [ValidMixin],
    props: {
        title: {type: String},                                                                                          //列标题
        field: {type: String},                                                                                          //列绑定的字段
        width: {type: Number, default: 200},                                                                            //列宽度
        order: {type: Number, default: 0},                                                                              //列排序
        fixed: {type: String, default: 'center', validator: val => $utils.oneOf(val, ['left', 'center', 'right'])},     //固定列位置
        search: {type: Boolean, default: true},                                                                         //可查询
        sort: {type: Boolean, default: true},                                                                           //可排序
        quickFilter: {type: Boolean, default: false},                                                                   //可快速筛选，仅值列表列有效
        filterName: {type: String, default: 'input'},                                                                   //筛选组件名称
        filterOption: {type: Object},                                                                                   //筛选参数
        lov: {type: String},                                                                                            //值列表类型
        editable: {type: Boolean, default: true},                                                                       //是否可编辑
        placeLeft: {type: Boolean},                                                                                     //当出现左滚动列的时候，是否自动设置为左固定列
        placeRight: {type: Boolean},                                                                                    //当出现右滚动列的时候，是否自动设置为右固定列
        align: {type: String, default: 'left'},                                                                         //非编辑状态下文本对其方式
        dataType: {type: String},                                                                                       //数据格式化方式:tel,cny,money,percent
        tooltip: {type: Boolean},                                                                                       //是否tooltip显示文本
        link: {type: Boolean},                                                                                          //是否以超链接的形式展示文本，并且点击的时候回派发事件

        editableFunc: {type: Function},                                                                                 //是否可编辑判断函数
        requiredFunc: {type: Function},                                                                                 //是否必输
    },
    computed: {
        col() {
            return this.$refs.column.col;
        }
    },
    methods: {
        /**
         * 点击子行动作事件
         * @author  韦胜健
         * @date    2019/1/10 17:45
         */
        lv_clickItem(row, rowIndex, editRow) {
            this.$emit('click', {row, rowIndex, editRow, field: this.field, editable: this.editable})
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
            _lv_row: null,
        }
    },
    computed: {
        /**
         * 行编辑单元格所属ROW组件对象
         * @author  韦胜健
         * @date    2019/1/8 10:21
         */
        lv_row() {
            if (!this._lv_row) this._lv_row = this.$plain.$dom.findComponentUpward(this, 'lv-table-row')
            return this._lv_row
        },
        /**
         * 当前是否可编辑
         * @author  韦胜健
         * @date    2019/1/10 15:31
         */
        lv_editable() {
            if (this.rowIndex == null && this.colIndex == null) return
            const editable = this.currentEditable && this.editable
            return editable && (!this.editableFunc || this.editableFunc(this.lv_data))
        },
        /**
         * 当前是否必输
         * @author  韦胜健
         * @date    2019/1/18 15:59
         */
        lv_required() {
            if (this.rowIndex == null && this.colIndex == null) return
            return !!this.requiredFunc ? this.requiredFunc(this.lv_data) : this.required
        },
        /**
         * 用于判断常用参数
         * @author  韦胜健
         * @date    2019/1/18 16:35
         */
        lv_data() {
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
            return this.lv_editable ? this.editRow : this.row
        },
    },
    mounted() {
        this.rowIndex != null && this.colIndex != null && this.lv_row.lv_add(this)
    },
    beforeDestroy() {
        !!this.lv_row && this.lv_row.lv_remove(this)
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