import $utils from '../../../src/scripts/utils'

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
    align: {type: String, default: 'left'},                                                                         //非编辑状态下文本对其方式

    search: {type: Boolean, default: true},                                                                         //可查询
    searchField: {type: Boolean},                                                                                   //查询字段
    sort: {type: Boolean, default: true},                                                                           //可排序
    sortField: {type: Boolean},                                                                                     //排序字段
    editable: {type: Boolean, default: true},                                                                       //是否可编辑
    editableFunc: {type: Function},                                                                                 //是否可编辑判断函数

    dataType: {type: String},                                                                                       //数据格式化方式:tel,cny,money,percent
    formatter: {type: Function},                                                                                    //文本格式化函数，支持异步格式化
    tooltip: {type: Boolean},                                                                                       //是否tooltip显示文本
    link: {type: Boolean},                                                                                          //是否以超链接的形式展示文本，并且点击的时候回派发事件
    clickWhenIneditable: {type: Boolean, default: true},                                                            //只有非编辑状态下才能出发点击事件，否则任何状态都会触发点击事件
    showInDialog: {type: Boolean},                                                                                  //非编辑状态下是否点击后再dialog中显示

    required: {type: Boolean},                                                                                      //是否必输
    rules: {type: Array},                                                                                           //校验规则
    validFunc: {type: Function},                                                                                    //自定义验证函数
    validOnInit: {type: Boolean},                                                                                   //是否在初始化的时候进行校验
    requiredFunc: {type: Function},                                                                                 //是否必输

    quickFilter: {type: Boolean, default: false},                                                                   //可快速筛选，仅值列表列有效
    filterName: {type: String, default: 'input'},                                                                   //筛选组件名称
    filterOption: {type: Object},                                                                                   //筛选参数
    lov: {type: String},                                                                                            //值列表类型

    /*不可配置信息*/
    scopedSlots: {type: Object},                                                                                    //作用域插槽
    renderNormal: {type: Function},                                                                                 //渲染函数:非编辑状态
    renderEdit: {type: Function},                                                                                   //渲染函数：编辑状态
    renderHead: {type: Function},                                                                                   //渲染函数：列头
    propData: {type: Object},                                                                                       //列额外数据信息
}

const refreshProps = [
    'fit',
    'order',
    'fixed,',
    'placeLeft',
    'placeRight',
    'hide',
    'disabledConfig',
    'scopedSlots',
    'renderNormal',
    'renderEdit',
    'renderHead',
]

const BaseColumnMixin = {
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

class TableColumn {
    constructor(context) {
        const originalProps = Object.keys(props).reduce((ret, key) => {
            // context.$set(ret, key, context[key])
            ret[key] = context[key]
            return ret
        }, {})
        originalProps.width = context.$plain.$utils.removePx(originalProps.width)
        this.originalProps = originalProps
        Object.assign(this, originalProps)
    }
}

const BasicColumnGroupMixin = {
    props: {
        title: {},                                  //多级表头标题
        order: {type: Number, default: 0},          //多级表头排序序号
        fixed: {type: String, default: 'center'},   //多级表头固定位置
        placeLeft: {type: Boolean},                 //当出现左滚动列的时候，是否自动设置为左固定列
        placeRight: {type: Boolean},                //当出现右滚动列的时候，是否自动设置为右固定列
        isCtrlGroup: {type: Boolean},               //是否为列控制器服务
    },
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
        this.group = true
    }
}

export {
    refreshProps,
    BaseColumnMixin,
    BasicColumnGroupMixin,
    TableColumn,
    TableColumnGroup,
}