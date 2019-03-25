<template>
    <pl-base-column
            ref="column"
            v-bind="columnBinding"
            :title-scoped-slot="$scopedSlots.title">
        <template slot-scope="{row,rowIndex,col,colIndex,editRow}">
            <pl-column-input-item
                    :row="row"
                    :edit-row="editRow"
                    :row-index="rowIndex"
                    :col="col"
                    :col-index="colIndex"
                    v-bind="columnItemBinding"
                    @click="p_clickItem"/>
        </template>
    </pl-base-column>
</template>

<script>
    import {ColumnMixin} from "../mixins";
    import PlColumnInputItem from "./pl-column-input-item";
    import PlBaseColumn from "../../table/pl-base-column";

    export default {
        name: "pl-column-input",
        components: {PlBaseColumn, PlColumnInputItem},
        mixins: [ColumnMixin],
    }
</script>

<style lang="scss">

</style>