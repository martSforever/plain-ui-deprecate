<template>
    <pl-base-table-column
            v-bind="columnBinding"
            :scoped-slots="$scopedSlots"
            :render-func="renderFunc"
    />
</template>

<script>
    import PlBaseTableColumn from "../base-table/pl-base-table-column";
    import {BaseColumnMixin} from "../base-table/mixin";

    export default {
        name: "pl-base-table-column-basic",
        components: {PlBaseTableColumn},
        mixins: [BaseColumnMixin],
    }
</script>

<style lang="scss">

</style>