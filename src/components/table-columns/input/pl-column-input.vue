<template>
    <pl-base-column
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
            <pl-column-input-item
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

                    :required="required"
                    :rules="rules"
                    :valid-on-init="validOnInit"

                    :editable-func="editableFunc"
                    :required-func="requiredFunc"
                    @click="p_clickItem"/>
        </template>
    </pl-base-column>
</template>

<script>
    import {ColumnMixin} from "../mixins";
    import PlColumnInputItem from "./pl-column-input-item";
    import PlBaseColumn from "../../table/pl-base-column";
    import PlColumnText from "../pl-column-text";

    export default {
        name: "pl-column-input",
        components: {PlColumnText, PlBaseColumn, PlColumnInputItem},
        mixins: [ColumnMixin],
    }
</script>

<style lang="scss">

</style>