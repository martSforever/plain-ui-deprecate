<template>
    <pl-base-table-column
            ref="column"
            v-bind="columnBinding"
            :scopedSlots="$scopedSlots || {}"
            :renderNormal="renderNormal"
            :renderEdit="renderEdit"
            :renderHead="renderHead"
    />
</template>

<script>
    import PlBaseTableColumn from "../base-table/pl-base-table-column";
    import {BaseColumnMixin} from "../base-table/mixin";

    export default {
        name: "pl-base-table-column-basic",
        components: {PlBaseTableColumn},
        mixins: [BaseColumnMixin],
        methods: {
            col() {
                return this.$refs.column.col()
            },
            renderNormal(h, {row, editRow, showRow, rowIndex, col, colIndex, props}) {
                return <span>{showRow[col.field]}</span>
            },
            renderEdit(h, {row, editRow, showRow, rowIndex, col, colIndex, props}) {
                return <link-input value={showRow[col.field]} onInput={val => this.$set(showRow, col.field, val)}/>
            },
            renderHead(h, {col}) {
                return <span>{col.title}</span>
            },
        }
    }
</script>

<style lang="scss">

</style>