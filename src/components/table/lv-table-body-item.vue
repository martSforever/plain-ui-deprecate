<template>
    <div class="lv-table-body-item" :class="[`lv-table-body-item-${fixed}`]" :style="styles">
        <lv-scroll
                ref="scroll"
                :scroll-x="fixed === 'center'"
                :scroll-y="rowNum!=null"
                :fit-height="rowNum==null"
                :hide-scrollbar="fixed === 'left'"
                @scroll="e=>$emit('scroll',e)">
            <table cellspacing="0" cellpadding="0" border="0">
                <lv-table-column-space :columns="bodyColumns"/>
                <lv-table-row v-for="(row,rowIndex) in data"
                              :key="row.p_id"
                              :row="row"
                              :edit-row="editData[rowIndex]"
                              :row-index="rowIndex"
                              :columns="bodyColumns"
                              :row-height="rowHeight"
                              :fixed="fixed"
                />
            </table>
        </lv-scroll>
    </div>
</template>

<script>
    import {TableMixin} from "./index";
    import LvTableRow from "./lv-table-row";
    import LvTableColumnSpace from "./lv-table-column-space";
    import LvScroll from "../scroll/lv-scroll";
    import {MountedMixin} from "../../mixin/component-mixin";

    export default {
        name: "lv-table-body-item",
        components: {LvScroll, LvTableColumnSpace, LvTableRow},
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
    .lv-table-body-item {
        background-color: white;
        &.lv-table-body-item-left, &.lv-table-body-item-right {
            position: absolute;
            top: 0;
            overflow: hidden;
            height: 100%;
        }
        &.lv-table-body-item-right {
            right: 0;
            .lv-scroll-content-wrapper {
                position: relative;
                .lv-scroll-content {
                    right: 0;
                    position: absolute;
                    float: right;
                }
            }
        }
        .lv-scroll-content {
            padding-bottom: 9px;
        }
    }
</style>