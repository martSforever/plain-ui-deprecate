const TableMixin = {
    props: {
        /*一下为base table可设置属性*/
        data: {type: Array, default: () => []},         //显示的数据数组
        rowNum: {type: Number, default: 10},            //显示的行数，超过则会出现滚动条
        rowHeight: {type: Number, default: 36},         //行高
        headRowHeight: {type: Number, default: 40},     //表头标题行显示高度
        noHeader: {type: Boolean},                      //不显示表头
        /*以下为base table不可设置属性*/
        editData: {},                                   //编辑数据数组
        headColumns: {type: Array},                     //渲染表格头列信息数组
        bodyColumns: {type: Array},                     //渲染表体列信息数组
        fixedExist: {type: Object},                     //固定列是否存在
        fixed: {type: String, default: 'center'},       //固定表格的位置:left,center,right
        hostWidth: {type: Number},                      //宿主宽度
        sortField: {type: String},                      //排序字段
        sortDesc: {type: Boolean, default: true},       //先序降序
    },
}

export {
    TableMixin,
}