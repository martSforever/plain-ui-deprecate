<template>
    <div class="lv-table-head" :style="styles">
        <lv-scroll :scroll-y="false" :scroll-x="true" hide-scrollbar class="lv-table-head-scroll" ref="scroll" @scroll="e=>$emit('scroll',e)">
            <lv-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="center" :sort-field="sortField" :sort-desc="sortDesc"/>
        </lv-scroll>
        <lv-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="left" v-if="fixedExist.left" :sort-field="sortField" :sort-desc="sortDesc"/>
        <lv-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="right" v-if="fixedExist.right" :sort-field="sortField" :sort-desc="sortDesc"/>
    </div>
</template>

<script>
    import LvTableColumnSpace from "./lv-table-column-space";
    import LvTableHeadCell from "./lv-table-head-cell";
    import LvScroll from "../scroll/lv-scroll";
    import LvTableHeadItem from "./lv-table-head-item";
    import {TableMixin} from "./index";

    export default {
        name: "lv-table-head",
        components: {LvTableHeadItem, LvScroll, LvTableHeadCell, LvTableColumnSpace},
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
    .lv-table-head {
        position: relative;
        overflow: hidden;
        border-bottom: solid $base-table-border-size $base-table-border-color;
        tr:not(.lv-table-column-space) {
            height: $base-table-head-row-Height;
            font-size: $base-table-font-size;
            font-weight: $base-table-font-weight;
        }
        & + .lv-table-body {
            border-top: none;
        }
    }
</style>