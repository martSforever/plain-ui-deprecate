<template>
    <link-dialog
        v-model="p_show"
        width="500px"
        maxHeight="500px"
        title="详情"
        dialogClass="link-table-form-dialog"
        confirmButton
        cancelButton
        @confirm="p_confirm"
        @cancel="p_cancel">
        <pl-table-cell-controller ref="controller" tag="div" default-editing @itemsChange="p_itemsChange" :editable="editable" :required="required">
            <link-form :labelWidth="labelWidth">
                <link-form-column>
                    <template v-for="(col,colIndex) in columns">
                        <link-form-item :key="index" :label="col.title" v-show="p_isShow(col)">
                            <lv-scope-slot :scope-slot-func="col.colScopedSlot" :data="{row,editRow,rowIndex:0,col,colIndex}"/>
                        </link-form-item>
                    </template>
                </link-form-column>
            </link-form>
        </pl-table-cell-controller>
    </link-dialog>
</template>

<script>
    import LvScopeSlot from "../render/lv-scope-slot";
    import PlTableCellController from "./pl-table-cell-controller";

    export default {
        name: "link-table-form-dialog",
        components: {PlTableCellController, LvScopeSlot},
        props: {
            columns: {type: Array, default: () => []},
        },
        data() {
            return {
                labelWidth: '100px',

                row: {},
                editRow: {},
                rowIndex: {},

                onConfirm: null,
                onCancel: null,

                editable: null,
                required: null,

                p_show: false,
                items: [],
            }
        },
        methods: {
            p_confirm() {
                const {flag, validateMsg, col} = this.$refs.controller.validate()
                if (flag) {
                    !!this.onConfirm && this.onConfirm(this.editRow)
                    this.p_show = false
                }
                else {
                    this.$dialog.show(`${col.title}${validateMsg}`)
                }
            },
            p_cancel() {
                this.p_show = false
                !!this.onCancel && this.onCancel()
            },
            p_itemsChange(items) {
                this.items = items
            },
            p_isShow(col) {
                const item = this.$plain.$utils.findOne(this.items, i => i.col === col)
                if (!item) return false
                return item.lv_editable && !col.disabledFormEdit
            },
        }
    }
</script>