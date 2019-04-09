<template>
    <tr class="pl-base-table-row"
        @click="p_click"
        @dblclick="p_dblclick"
        @mouseenter="p_enter"
        @mouseleave="p_leave"
        :class="{'pl-base-table-row-hover':p_hover,'pl-base-table-row-selected':p_selected,'pl-base-table-row-editing':p_editing}">
        <td v-for="(col,colIndex) in columns" :key="colIndex">
            <pl-base-table-cell
                    :is-fixed="fixed === col.fixed"
                    :data="{row,editRow,rowIndex,col,colIndex,showRow,prop:col.propData}"
                    :text="showRow[col.field]"
                    :height="rowHeight"
                    :width="col.width"
                    :col="col"
                    :default-scoped-slots="col.scopedSlots.default"
                    :default-render-func="col.renderNormal"
                    :edit-scoped-slots="col.scopedSlots.edit"
                    :edit-render-func="col.renderEdit"
                    :editing="p_editing"/>
        </td>
    </tr>
</template>

<script>
    import {TableMixin} from "./index";
    import PlBaseTableCell from "./pl-base-table-cell";

    export default {
        name: "pl-base-table-row",
        components: {PlBaseTableCell},
        mixins: [TableMixin],
        props: {
            columns: {},
            row: {},
            rowIndex: {},
            editRow: {},
        },
        data() {
            return {
                p_baseTable: null,
                p_hover: false,
                p_selected: false,
                p_editing: false,
            }
        },
        computed: {
            showRow() {
                return this.p_editing ? this.editRow : this.row
            },
        },
        mounted() {
            this.p_baseTable = this.$plain.$dom.findComponentUpward(this, 'pl-base-table')
            this.p_baseTable.pl_rowAdd({row: this, position: this.fixed})
        },
        beforeDestroy() {
            this.p_baseTable.pl_rowRemove({row: this, position: this.fixed})
        },
        methods: {
            /**
             * 选中
             * @author  韦胜健
             * @date    2019/1/9 18:04
             */
            select() {
                this.p_selected = true
            },
            /**
             * 取消选中
             * @author  韦胜健
             * @date    2019/1/9 18:04
             */
            unselect() {
                this.p_selected = false
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

                /*this.items.forEach(item => {
                    const inputs = this.$plain.$dom.findComponentsDownward(item, 'link-input')
                    inputs.forEach(input => {
                        if (!flag) return
                        if (!input.validate()) {
                            flag = false
                            validateMsg = input.validateMsg
                            field = item.field
                        }
                    })
                })*/

                return {flag, field, validateMsg}
            },
            /**
             * 单击事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_click() {
                const param = {row: this, rowIndex: this.rowIndex, position: this.fixed}
                this.p_baseTable.$emit('rowClick', param)
                this.$emit('click', param)
            },
            /**
             * 双击事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_dblclick() {
                const param = {row: this, rowIndex: this.rowIndex, position: this.fixed}
                this.p_baseTable.$emit('rowDblClick', param)
                this.$emit('dblclick', param)
            },
            /**
             * 鼠标悬浮事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_enter() {
                this.p_baseTable.$emit('rowEnter', {row: this, rowIndex: this.rowIndex, position: this.fixed})
            },
            /**
             * 鼠标离开事件
             * @author  韦胜健
             * @date    2019/1/9 11:22
             */
            p_leave() {
                this.p_baseTable.$emit('rowLeave', {row: this, rowIndex: this.rowIndex, position: this.fixed})
            },
            /**
             * 开启编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            async enableEdit() {
                this.p_editing = true
                await this.$nextTick()
                window.getSelection().empty()
            },
            /**
             * 关闭编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            disableEdit() {
                this.p_editing = false
            },
        }
    }
</script>

<style lang="scss">
    .pl-base-table-row {
        &.pl-base-table-row-hover {
            background-color: $p-base-table-hover-row-background;
        }
        &.pl-base-table-row-editing {
            background-color: initial;
        }
        &.pl-base-table-row-selected {
            background-color: $p-base-table-hover-row-background;
        }
        .pl-base-table-cell {
            font-size: 12px;
            font-weight: 500;
        }
    }
</style>