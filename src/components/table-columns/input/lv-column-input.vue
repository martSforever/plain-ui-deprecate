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
            <lv-column-input-item
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
                    :scope-slot-func="$scopedSlots.default"
                    :required="required"
                    :rules="rules"
                    :valid-on-init="validOnInit"

                    :editable-func="editableFunc"
                    :required-func="requiredFunc"
                    @click.native="p_clickItem(row,rowIndex,editRow)"/>
        </template>
    </lv-base-column>
</template>

<script>
    import {ColumnMixin} from "../mixins";
    import LvColumnInputItem from "./lv-column-input-item";
    import LvBaseColumn from "../../table/lv-base-column";
    import LvColumnText from "../lv-column-text";

    export default {
        name: "lv-column-input",
        components: {LvColumnText, LvBaseColumn, LvColumnInputItem},
        mixins: [ColumnMixin],
    }
</script>

<style lang="scss">

</style>