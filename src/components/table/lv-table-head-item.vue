<template>
    <div class="lv-table-head-item" :class="[`lv-table-head-item-${fixed}`]" :style="{width:`${width}px`}">
        <table cellspacing="0" cellpadding="0" border="0">
            <tr v-for="(row,rowIndex) in headColumns" :key="rowIndex">
                <lv-table-head-cell v-for="(col,colIndex) in row"
                                    :fixed="fixed"
                                    :key="colIndex"
                                    :col="col"
                                    :sort-field="sortField"
                                    :sort-desc="sortDesc"/>
            </tr>
            <lv-table-column-space :columns="bodyColumns"/>
        </table>
    </div>
</template>

<script>
    import {TableMixin} from "./index";
    import LvTableHeadCell from "./lv-table-head-cell";
    import LvTableColumnSpace from "./lv-table-column-space";

    export default {
        name: "lv-table-head-item",
        components: {LvTableColumnSpace, LvTableHeadCell},
        mixins: [TableMixin],
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
        },
    }
</script>

<style lang="scss">
    .lv-table-head-item {
        background-color: $base-table-head-background;
        &.lv-table-head-item-left, &.lv-table-head-item-right {
            position: absolute;
            top: 0;
            height: 100%;
            overflow: hidden;
        }
        &.lv-table-head-item-right {
            right: 0;
            table {
                position: absolute;
                right: 0;
            }
        }
    }
</style>