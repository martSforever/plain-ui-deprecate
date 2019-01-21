<template>
    <div class="pl-table-head-item" :class="[`pl-table-head-item-${fixed}`]" :style="{width:`${width}px`}">
        <table cellspacing="0" cellpadding="0" border="0">
            <tr v-for="(row,rowIndex) in headColumns" :key="rowIndex">
                <pl-table-head-cell v-for="(col,colIndex) in row"
                                    :fixed="fixed"
                                    :key="colIndex"
                                    :col="col"
                                    :sort-field="sortField"
                                    :sort-desc="sortDesc"/>
            </tr>
            <pl-table-column-space :columns="bodyColumns"/>
        </table>
    </div>
</template>

<script>
    import {TableMixin} from "./index";
    import PlTableHeadCell from "./pl-table-head-cell";
    import PlTableColumnSpace from "./pl-table-column-space";

    export default {
        name: "pl-table-head-item",
        components: {PlTableColumnSpace, PlTableHeadCell},
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
    .pl-table-head-item {
        background-color: $base-table-head-background;
        &.pl-table-head-item-left, &.pl-table-head-item-right {
            position: absolute;
            top: 0;
            height: 100%;
            overflow: hidden;
        }
        &.pl-table-head-item-right {
            right: 0;
            table {
                position: absolute;
                right: 0;
            }
        }
    }
</style>