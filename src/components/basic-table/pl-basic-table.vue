<template>
    <div class="pl-basic-table">
        pl-basic-table
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";
    import {BasicTableMixin} from "./index";

    export default {
        name: "pl-basic-table",
        mixins: [MountedMixin, BasicTableMixin],
        props: {
            multiSelect: {type: Boolean},               //是否多选
            selectIndex: {},                            //当前选中行索引
            configColumnFunc: {type: Function},         //配置column的函数
            beforeConfigColumnFunc: {type: Function},   //在配置column之前触发的函数
        },
        data() {
            return {
            }
        },
    }
</script>

<style lang="scss">

</style>