<template>
    <tr class="lv-table-row"
        @click="lv_click"
        @dblclick="lv_dblclick"
        @mouseenter="lv_enter"
        @mouseleave="lv_leave"
        :class="{'lv-table-row-hover':lv_hover,'lv-table-row-selected':lv_selected}">
        <td v-for="(col,colIndex) in columns" :key="colIndex">
            <lv-table-cell
                    :is-fixed="col.fixed === fixed"
                    :scope-slot-func="col.colScopedSlot"
                    :data="{row,rowIndex,col,colIndex,editRow}"
                    :text="row[col.field]"
                    :row-height="rowHeight"
                    :width="col.width"
            />
        </td>
    </tr>
</template>

<script>
    import LvTableCell from "./lv-table-cell";
    import {TableMixin} from "./index";

    export default {
        name: "lv-table-row",
        components: {LvTableCell},
        mixins: [TableMixin],
        props: {
            columns: {},
            row: {},
            rowIndex: {},
            editRow: {},
        },
        data() {
            return {
                lv_baseTable: null,
                lv_hover: false,
                lv_selected: false,
                lv_editing: false,
                items: [],
            }
        },
        mounted() {
            this.lv_baseTable = this.$lv.$dom.findComponentUpward(this, 'lv-base-table')
            this.lv_baseTable.lv_rowAdd({row: this, position: this.fixed})
        },
        beforeDestroy() {
            this.lv_baseTable.lv_rowRemove({row: this, position: this.fixed})
        },
        methods: {
            /**
             * 选中
             * @author  韦胜健
             * @date    2019/1/9 18:04
             */
            select() {
                this.lv_selected = true
            },
            /**
             * 取消选中
             * @author  韦胜健
             * @date    2019/1/9 18:04
             */
            unselect() {
                this.lv_selected = false
            },
            /**
             * 校验
             * @author  韦胜健
             * @date    2019/1/14 16:52
             */
            validate() {
                // TODO 这里校验规则需要修正
                let flag = true                     //输入是否通过标识
                let validateMsg = null;             //输入不通过提示信息
                let field = null;                   //输入不通过字段

                this.items.forEach(item => {
                    const inputs = this.$lv.$dom.findComponentsDownward(item, 'link-input')
                    inputs.forEach(input => {
                        if (!flag) return
                        if (!input.validate()) {
                            flag = false
                            validateMsg = input.validateMsg
                            field = item.field
                        }
                    })
                })

                return {flag, field, validateMsg}
            },
            /**
             * 单击事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            lv_click() {
                const param = {row: this, rowIndex: this.rowIndex, position: this.fixed}
                this.lv_baseTable.$emit('rowClick', param)
                this.$emit('click', param)
            },
            /**
             * 双击事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            lv_dblclick() {
                const param = {row: this, rowIndex: this.rowIndex, position: this.fixed}
                this.lv_baseTable.$emit('rowDblClick', param)
                this.$emit('dblclick', param)
            },
            /**
             * 鼠标悬浮事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            lv_enter() {
                this.lv_baseTable.$emit('rowEnter', {row: this, rowIndex: this.rowIndex, position: this.fixed})
            },
            /**
             * 鼠标离开事件
             * @author  韦胜健
             * @date    2019/1/9 11:22
             */
            lv_leave() {
                this.lv_baseTable.$emit('rowLeave', {row: this, rowIndex: this.rowIndex, position: this.fixed})
            },
            /**
             * 添加子编辑组件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            lv_add(item) {
                this.items.push(item)
            },
            /**
             * 不添加子编辑组件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            lv_remove(item) {
                this.$lv.$utils.removeFromArray(this.items, item)
            },


            /**
             * 开启编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            enableEdit() {
                this.items.forEach(item => item.enableEdit())
                this.lv_editing = true
            },
            /**
             * 关闭编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            disableEdit() {
                this.items.forEach(item => item.disableEdit())
                this.lv_editing = false
            },
        }
    }
</script>

<style lang="scss">
    .lv-table-row {
        &.lv-table-row-hover, &.lv-table-row-selected {
            background-color: $base-table-hover-row-background;
        }
        .lv-table-cell {
            font-size: 12px;
            font-weight: 500;
        }
    }
</style>