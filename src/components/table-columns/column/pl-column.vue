<template>
    <pl-base-column
            ref="column"
            :title="title"
            :field="field"
            :width="width"
            :fit="fit"
            :order="order"
            :fixed="fixed"
            :search="search"
            :sort="sort"
            :quick-filter="quickFilter"
            :filter-name="filterName"
            :filter-option="filterOption"
            :lov="lov"
            :place-left="placeLeft"
            :place-right="placeRight"
            :align="align"
            :hide="hide"
            :disabled-config="disabledConfig">
        <template slot-scope="{row,rowIndex,col,colIndex,editRow}">
            <pl-column-item
                    :row="row"
                    :edit-row="editRow"
                    :row-index="rowIndex"
                    :col="col"
                    :col-index="colIndex"
                    :field="field"
                    :editable="editable"
                    :align="align"
                    :data-type="dataType"
                    :tooltip="tooltip"
                    :link="link"
                    :scope-slot-func="$scopedSlots.default"
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
    }
</script>

<style lang="scss">
    .pl-column-edit-item {
        width: 100%;
    }
</style>