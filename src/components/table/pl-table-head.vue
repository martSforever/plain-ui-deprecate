<template>
    <div class="pl-table-head" :style="styles">
        <pl-scroll :scroll-y="false" :scroll-x="true" hide-scrollbar class="pl-table-head-scroll" ref="scroll" @scroll="e=>$emit('scroll',e)">
            <pl-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="center" :sort-field="sortField" :sort-desc="sortDesc"/>
        </pl-scroll>
        <pl-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="left" v-if="fixedExist.left" :sort-field="sortField" :sort-desc="sortDesc"/>
        <pl-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="right" v-if="fixedExist.right" :sort-field="sortField" :sort-desc="sortDesc"/>
    </div>
</template>

<script>
    import PlTableColumnSpace from "./pl-table-column-space";
    import PlTableHeadCell from "./pl-table-head-cell";
    import PlScroll from "../scroll/pl-scroll";
    import PlTableHeadItem from "./pl-table-head-item";
    import {TableMixin} from "./index";

    export default {
        name: "pl-table-head",
        components: {PlTableHeadItem, PlScroll, PlTableHeadCell, PlTableColumnSpace},
        mixins: [TableMixin],
        computed: {
            styles() {
                return {
                    height: `${this.headColumns.length * this.headRowHeight}px`
                }
            },
        },
    }
</script>

<style lang="scss">
    .pl-table-head {
        position: relative;
        overflow: hidden;
        border-bottom: solid $base-table-border-size $base-table-border-color;
        tr:not(.pl-table-column-space) {
            height: $base-table-head-row-Height;
            font-size: $base-table-font-size;
            font-weight: $base-table-font-weight;
        }
        & + .pl-table-body {
            border-top: none;
        }
    }
</style>