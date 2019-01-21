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
        <template slot-scope="data" slot="title">
            <lv-column-text :align="align" label="#"/>
        </template>
        <template slot-scope="{row,rowIndex,col,colIndex,editRow}">
            <lv-column-text :align="align"
                            :label="(page-1)*pageSize + (rowIndex+1)"/>
        </template>
    </lv-base-column>
</template>

<script>
    import {ColumnMixin} from "../mixins";
    import LvColumnText from "../lv-column-text";
    import LvBaseColumn from "../../table/lv-base-column";

    export default {
        name: "lv-column-index",
        components: {LvBaseColumn, LvColumnText},
        mixins: [ColumnMixin],
        props: {
            order:{default:101},
            page: {type: Number, default: 1},
            pageSize: {type: Number, default: 1},
            width: {type: Number, default: 30},
            placeLeft: {type: Boolean, default: true},
            sort: {type: Boolean, default: false},
            search: {type: Boolean, default: false},

            align: {default: 'center'},
        },
    }
</script>