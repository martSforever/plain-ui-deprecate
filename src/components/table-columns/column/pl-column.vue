<template>
    <pl-base-column
            ref="column"
            v-bind="columnBinding">
        <template slot-scope="{row,rowIndex,col,colIndex,editRow}">
            <pl-column-item
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
    import PlBaseColumn from "../../table/pl-base-column";
    import PlColumnItem from "./pl-column-item";

    export default {
        name: "pl-column-input",
        components: {PlColumnItem, PlBaseColumn,},
        mixins: [ColumnMixin],
        props: {
            disabledFormEdit: {default: true},
        },
    }
</script>

<style lang="scss">
    .pl-column-edit-item {
        width: 100%;
    }
</style>