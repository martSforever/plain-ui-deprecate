<template>
    <div class="pl-basic-table-column">
        pl-basic-table-column
    </div>
</template>

<script>
    import {BasicColumnMixin, TableColumn} from "./mixins";

    export default {
        name: "pl-basic-table-column",
        mixins: [BasicColumnMixin],
        data() {
            return {
                p_col: new TableColumn(this)
            }
        },
        methods: {
            col() {
                return this.p_col
            },
        }
    }
</script>

<style lang="scss">

</style>