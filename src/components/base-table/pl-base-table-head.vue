<template>
    <div class="pl-base-table-head" :style="styles">
        <pl-scroll :scroll-y="false" :scroll-x="true" hide-scrollbar class="pl-base-table-head-scroll" ref="scroll" @scroll="e=>$emit('scroll',e)">
            <pl-base-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="center" :sort-field="sortField" :sort-desc="sortDesc" :head-row-height="headRowHeight"/>
        </pl-scroll>
        <pl-base-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="left" v-if="fixedExist.left" :sort-field="sortField" :sort-desc="sortDesc" :head-row-height="headRowHeight"/>
        <pl-base-table-head-item :head-columns="headColumns" :body-columns="bodyColumns" fixed="right" v-if="fixedExist.right" :sort-field="sortField" :sort-desc="sortDesc"
                            :head-row-height="headRowHeight"/>
    </div>
</template>

<script>
    import PlScroll from "../scroll/pl-scroll";
    import {TableMixin} from "./index";
    import PlBaseTableHeadItem from "./pl-base-table-head-item";

    export default {
        name: "pl-base-table-head",
        components: {PlBaseTableHeadItem, PlScroll},
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
    .pl-base-table-head {
        position: relative;
        overflow: hidden;
        border-bottom: solid $p-base-table-border-size $p-base-table-border-color;
        tr:not(.pl-base-table-column-space) {
            font-size: $p-base-table-font-size;
            font-weight: $p-base-table-font-weight;
        }
        & + .pl-base-table-body {
            border-top: none;
        }
    }
</style>