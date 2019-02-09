<template>
    <div class="pl-tree">
        <pl-tree-node v-for="(item,index) in data"
                      :key="index"
                      :data="item"
                      :label-key="labelKey"
                      :children-key="childrenKey"/>
    </div>
</template>

<script>
    import PlTreeNode from "./pl-tree-node";

    export default {
        name: "pl-tree",
        components: {PlTreeNode},
        props: {
            data: {type: Array, default: () => []},
            labelKey: {type: String, required: true},
            childrenKey: {type: String, required: true},

        },
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