<template>
    <div class="pl-base-table-body-item" :class="[`pl-base-table-body-item-${fixed}`]" :style="styles">
        <pl-scroll
                ref="scroll"
                :scroll-x="fixed === 'center'"
                :scroll-y="rowNum!=null"
                :fit-height="rowNum==null"
                :hide-scrollbar="fixed === 'left'"
                @scroll="e=>$emit('scroll',e)">
            <table cellspacing="0" cellpadding="0" border="0">
                <pl-base-table-row v-for="(item,rowIndex) in tableData"
                              :key="item.id"
                              :row="item.row"
                              :edit-row="item.editRow"
                              :row-index="rowIndex"
                              :columns="bodyColumns"
                              :row-height="rowHeight"
                              :fixed="fixed"
                />
            </table>
        </pl-scroll>
    </div>
</template>

<script>
    import {TableMixin} from "./index";
    import PlScroll from "../scroll/pl-scroll";
    import {MountedMixin} from "../../mixin/component-mixin";
    import PlBaseTableRow from "./pl-base-table-row";

    export default {
        name: "pl-base-table-body-item",
        components: {PlBaseTableRow, PlScroll},
        mixins: [TableMixin, MountedMixin],
        computed: {
            /*
             *  设置表格外层显示的宽度，比如左固定列表格的宽度就是左固定列宽度纸盒
             *  @author     martsforever
             *  @datetime   2019/1/6 21:51
             */
            width() {
                if (this.fixed === 'center') return null
                return this.bodyColumns.reduce((ret, item) => item.fixed === this.fixed ? ret + item.width : ret, 0)
            },
            styles() {
                if (!this.p_mounted) return null
                const styles = {}
                this.rowNum != null && (styles.height = `${this.rowNum * this.rowHeight + 9}px`)
                styles.width = `${this.width}px`
                return styles
            },
        },
    }
</script>

<style lang="scss">
    .pl-base-table-body-item {
        background-color: white;
        &.pl-base-table-body-item-left, &.pl-base-table-body-item-right {
            position: absolute;
            top: 0;
            overflow: hidden;
            height: 100%;
        }
        &.pl-base-table-body-item-right {
            right: 0;
            .pl-scroll-content-wrapper {
                position: relative;
                .pl-scroll-content {
                    right: 0;
                    position: absolute;
                    float: right;
                    table {
                        float: right;
                    }
                }
            }
        }
        .pl-scroll-content {
            padding-bottom: 9px;
        }
    }
</style>