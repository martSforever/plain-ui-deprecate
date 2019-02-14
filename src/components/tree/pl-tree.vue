<template>
    <div class="pl-tree">
        <pl-tree-node v-for="(item,index) in data"
                      ref="nodes"
                      :key="index"
                      :data="item"
                      :label-key="labelKey"
                      :children-key="childrenKey"
                      :check-key="checkKey"
                      :auto-close="autoClose"
                      :empty-text="emptyText"
                      :toggle-on-click-content="toggleOnClickContent"
                      :initialized-after-open="initializedAfterOpen"
                      :checkbox="checkbox"
                      @open="val=>$emit('open',val)"
                      @close="val=>$emit('close',val)"
                      @click="val=>$emit('click',val)"
                      @childToggle="p_childToggle"/>
    </div>
</template>

<script>
    import PlTreeNode from "./pl-tree-node";
    import {TreeMixin} from "./index";

    export default {
        name: "pl-tree",
        components: {PlTreeNode},
        mixins: [TreeMixin],
        methods: {
            /*
             *  打开树节点
             *  @author     martsforever
             *  @datetime   2019/2/13 23:05
             */
            async open(data) {
                let dataArray = this.findParentDataArray(this.data, data, [])
                for (let i = 0; i < dataArray.length; i++) {
                    const itemData = dataArray[i];
                    const node = this.findNode(itemData, this.$refs.nodes)
                    if (!!node) {
                        node.open()
                        await this.$plain.nextTick()
                    }
                }
            },
            /*
             *  关闭树节点
             *  @author     martsforever
             *  @datetime   2019/2/13 23:05
             */
            close(data) {
                const targetNode = this.findNode(data, this.$refs.nodes)
                !!targetNode && targetNode.close()
            },
            /*
             *  找到数据的父级数据
             *  @author     martsforever
             *  @datetime   2019/2/13 23:06
             */
            findParentDataArray(treeData, targetData, ret = []) {
                if (!treeData || treeData.length === 0) return null
                for (let i = 0; i < treeData.length; i++) {
                    const itemData = treeData[i];
                    ret.push(itemData)
                    if (targetData === itemData) return ret
                    const itemRet = this.findParentDataArray(itemData[this.childrenKey], targetData, [...ret])
                    if (itemRet != null) return itemRet
                    ret.pop()
                }
                return null
            },
            /*
             *  根据数据获取对应节点组件对象
             *  @author     martsforever
             *  @datetime   2019/2/13 23:06
             */
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