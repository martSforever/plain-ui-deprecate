<template>
    <div class="pl-tree">
        <pl-tree-node v-for="(item,index) in data"
                      ref="nodes"
                      :key="index"
                      :data="item"
                      :label-key="labelKey"
                      :children-key="childrenKey"
                      :auto-close="autoClose"
                      :empty-text="emptyText"
                      :toggle-on-click-content="toggleOnClickContent"
                      :initialized-after-open="initializedAfterOpen"
                      @open="val=>$emit('open',val)"
                      @close="val=>$emit('close',val)"
                      @click="val=>$emit('click',val)"
                      @childToggle="p_childToggle"/>
    </div>
</template>

<script>
    import PlTreeNode from "./pl-tree-node";

    export default {
        name: "pl-tree",
        components: {PlTreeNode},
        props: {
            data: {type: Array, default: () => []},                                 //渲染的数据
            labelKey: {type: String, required: true},                               //显示的文本key
            childrenKey: {type: String, required: true},                            //子树渲染数据的key
            autoClose: {type: Boolean},                                             //打开节点之后是否关闭兄弟节点
            emptyText: {type: String, default: '无'},                                //无内容时显示的文本
            toggleOnClickContent: {type: Boolean, default: true},                   //是否点击节点内容的时候打开|关闭节点
            initializedAfterOpen: {type: Boolean, default: true},                   //是否在打开的时候才初始化内容，如果是想通过open打开特定节点，这里需要设置为false，就是初始化的时候就初始化所有节点，才可以通过open来打开特定节点，否则只能从父节点一层一层打开，到特定的节点
        },
        methods: {
            p_childToggle(child) {
                if (!this.autoClose) return
                if (child.p_open) {
                    this.$refs.nodes.forEach(item => {
                        if (item === child) return
                        if (item.p_open) item.close()
                    })
                }
            },
            open(data) {
                const targetNode = this.findNode(data, this.$refs.nodes)
                !!targetNode && targetNode.open()
            },
            close(data) {
                const targetNode = this.findNode(data, this.$refs.nodes)
                !!targetNode && targetNode.close()
            },
            findNode(data, nodes) {
                if (!nodes || nodes.length === 0) return null
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    if (node.data === data) return node
                    const ret = this.findNode(data, node.$refs.nodes)
                    if (!!ret) return ret
                }
                return null
            },
        }
    }
</script>

<style lang="scss">
    .pl-tree {
        @include public-style;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
</style>