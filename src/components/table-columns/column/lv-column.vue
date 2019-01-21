<template>
    <lv-base-column
            ref="column"
            :title="title"
            :field="field"
            :width="width"
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
            :align="align">
        <template slot-scope="{row,rowIndex,col,colIndex,editRow}">
            <lv-column-item
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
                    @click.native="lv_clickItem(row,rowIndex,editRow)"/>
        </template>
    </lv-base-column>
</template>

<script>
    import {ColumnMixin} from "../mixins";
    import LvBaseColumn from "../../table/lv-base-column";
    import LvColumnItem from "./lv-column-item";

    export default {
        name: "lv-column-input",
        components: {LvColumnItem, LvBaseColumn,},
        mixins: [ColumnMixin],
    }
</script>