<template>
    <pl-base-table-column
            ref="column"
            v-bind="columnBinding"
            :scopedSlots="$scopedSlots || {}"
            :renderNormal="normal"
            :renderEdit="edit"
            :renderHead="head"
            :propData="prop || {}"
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
            /*@formatter:off*/
            col() {return this.$refs.column.col()},
            normal(h, {row, editRow, showRow,text, rowIndex, col, colIndex, prop}) {return <span>{text}</span>},
            edit(h, {row, editRow, showRow, text,rowIndex, col, colIndex, prop}) {return <span>{text}</span>},
            head(h, {col}) {return <span>{col.title}</span>},
           /*@formatter:on*/
        }
    }
</script>

<style lang="scss">

</style>