<template>
    <span class="pl-base-table-column" :field="field"><slot :row="{}" :col="{}" :row-index="null" :col-index="null"></slot></span>
</template>

<script>
    import {BaseColumnMixin, refreshProps, TableColumn} from "./mixin";

    export default {
        name: "pl-base-table-column",
        mixins: [BaseColumnMixin],
        watch: {
            ...Object.keys(BaseColumnMixin.props).reduce((ret, key) => {
                ret[key] = function (val) {
                    if (val === undefined) return
                    if (refreshProps.indexOf(key) > -1) {
                        this.controller.pl_refresh()
                        return
                    }
                    this.p_col[key] = val
                }
                return ret
            }, {})
        },
        data() {
            return {
                p_col: null,
                p_controller: null,
            }
        },
        computed: {
            controller() {
                if (!this.p_controller) this.p_controller = this.$plain.$dom.findComponentUpward(this, 'pl-base-table-column-controller')
                return this.p_controller
            },
        },
        methods: {
            col() {
                this.p_col = new TableColumn(this)
                return this.p_col
            },
        },
    }
</script>