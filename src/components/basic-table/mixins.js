import $utils from '../../utils/utils'
import {ValidMixin} from "../../mixin/component-mixin";

const props = {
    title: {type: String},                                                                                          //列标题
    field: {type: String},                                                                                          //列绑定的字段
    width: {default: '200px'},                                                                                      //列宽度
    fit: {type: Number, default: 0},                                                                                //当列不满表格宽度时，该列所占剩下宽度的权重
    order: {type: Number, default: 0},                                                                              //列排序
    fixed: {type: String, default: 'center', validator: val => $utils.oneOf(val, ['left', 'center', 'right'])},     //固定列位置
    placeLeft: {type: Boolean},                                                                                     //当出现左滚动列的时候，是否自动设置为左固定列
    placeRight: {type: Boolean},                                                                                    //当出现右滚动列的时候，是否自动设置为右固定列
    hide: {type: Boolean},                                                                                          //是否隐藏
    disabledConfig: {type: Boolean},                                                                                //禁止配置改列

    search: {type: Boolean, default: true},                                                                         //可查询
    sort: {type: Boolean, default: true},                                                                           //可排序
    sortField: {type: String},                                                                                      //排序字段
    editable: {type: Boolean, default: true},                                                                       //是否可编辑
    editableFunc: {type: Function},                                                                                 //是否可编辑判断函数
    requiredFunc: {type: Function},                                                                                 //是否必输

    align: {type: String, default: 'left'},                                                                         //非编辑状态下文本对其方式
    dataType: {type: String},                                                                                       //数据格式化方式:tel,cny,money,percent
    tooltip: {type: Boolean},                                                                                       //是否tooltip显示文本
    className: {type: Boolean},                                                                                     //单元格快速样式
    clickWhenInEditable: {type: Boolean, default: true},                                                            //只有非编辑状态下才能出发点击事件，否则任何状态都会触发点击事件
    showInDialog: {type: Boolean},                                                                                  //非编辑状态下是否点击后再dialog中显示
}

const BasicColumnMixin = {
    mixins: [ValidMixin],
    props,
    computed: {
        columnBinding() {
            return Object.keys(props).reduce((ret, key) => {
                ret[key] = this[key]
                return ret
            }, {})
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
    }
}

const BasicColumnGroupMixin = {
    props: {
        title: {},                                  //多级表头标题
        order: {type: Number, default: 0},          //多级表头排序序号
        fixed: {type: String, default: 'center'},   //多级表头固定位置
        placeLeft: {type: Boolean},                 //当出现左滚动列的时候，是否自动设置为左固定列
        placeRight: {type: Boolean},                //当出现右滚动列的时候，是否自动设置为右固定列
    },
}

class TableColumn {
    constructor(context) {
        const originalProps = Object.keys(props).reduce((ret, key) => {
            // context.$set(ret, key, context[key])
            ret[key] = context[key]
            return ret
        }, {})
        this.originalProps = originalProps
        Object.assign(this, originalProps)
    }
}

class TableColumnGroup {
    constructor(context) {
        const originalProps = Object.keys(BasicColumnGroupMixin.props).reduce((ret, key) => {
            // context.$set(ret, key, context[key])
            ret[key] = context[key]
            return ret
        }, {})
        this.originalProps = originalProps
        Object.assign(this, originalProps)
    }
}

export {
    BasicColumnMixin,
    BasicColumnGroupMixin,
    TableColumn,
    TableColumnGroup
}