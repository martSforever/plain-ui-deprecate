<template>
    <span class="pl-base-table-column" :field="field"><slot :row="{}" :col="{}" :row-index="null" :col-index="null"></slot></span>
</template>

<script>
    import {BaseColumnMixin, TableColumn} from "./mixin";

    export default {
        name: "pl-base-table-column",
        mixins: [BaseColumnMixin],
        watch: {
            ...Object.keys(BaseColumnMixin.props).reduce((ret, key) => {
                ret[key] = function (val) {
                    if (val === undefined) return
                    this.p_col[key] = val
                }
                return ret
            }, {})
        },
        data() {
            return {
                p_col: null
            }
        },
        methods: {
            col() {
                this.p_col = new TableColumn(this)
                return this.p_col
            },
        },
    }
</script>