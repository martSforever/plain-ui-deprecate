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
            :align="align"
            :hide="hide"
            :disabled-config="disabledConfig">
        <template slot-scope="{row,rowIndex,col,colIndex,editRow}">
            <pl-column-text :align="align"
                            :label="(page-1)*pageSize + (rowIndex+1)"/>
        </template>
    </pl-base-column>
</template>

<script>
    import {ColumnMixin} from "../mixins";
    import PlColumnText from "../pl-column-text";
    import PlBaseColumn from "../../table/pl-base-column";

    export default {
        name: "pl-column-index",
        components: {PlBaseColumn, PlColumnText},
        mixins: [ColumnMixin],
        props: {
            order: {default: 101},
            page: {type: Number, default: 1},
            pageSize: {type: Number, default: 1},
            width: {type: Number, default: 30},
            placeLeft: {type: Boolean, default: true},
            sort: {type: Boolean, default: false},
            search: {type: Boolean, default: false},

            title: {default: '#'},
            align: {default: 'center'},
            disabledConfig: {default: true},
            disabledBatchModify: {default: true},

        },
    }
</script>