const TreeMixin = {
    props: {
        data: {type: Array, default: () => []},                                 //渲染的数据
        labelKey: {type: String, required: true},                               //显示的文本key
        childrenKey: {type: String, required: true},                            //子树渲染数据的key
        checkKey: {type: String},                                               //节点是否选中绑定的key
        autoClose: {type: Boolean},                                             //打开节点之后是否关闭兄弟节点
        emptyText: {type: String, default: '无'},                                //无内容时显示的文本
        toggleOnClickContent: {type: Boolean, default: true},                   //是否点击节点内容的时候打开|关闭节点
        initializedAfterOpen: {type: Boolean, default: true},                   //是否在打开的时候才初始化内容，如果是想通过open打开特定节点，这里需要设置为false，就是初始化的时候就初始化所有节点，才可以通过open来打开特定节点，否则只能从父节点一层一层打开，到特定的节点
        checkbox: {type: Boolean, default: false},                              //是否展示复选框
    }
}

export {
    TreeMixin
}