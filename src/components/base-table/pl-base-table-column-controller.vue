<template>
    <div class="pl-base-table-column-controller">
        <pl-base-table-column-group ref="group" is-ctrl-group>
            <slot></slot>
        </pl-base-table-column-group>
    </div>
</template>

<script>

    import PlBaseTableColumnGroup from "./pl-base-table-column-group";
    export default {
        name: "pl-base-table-column-controller",
        components: {PlBaseTableColumnGroup},
        mounted() {
            this.collect()
        },
        methods: {
            collect() {
                console.log('this.$children', this.$children)
                const columns = this.$refs.group.col().children
                let hasFixedLeft = false
                let hasFixedRight = false
                columns.forEach(col => {
                    col.fixed === 'left' && (hasFixedLeft = true)
                    col.fixed === 'right' && (hasFixedRight = true)
                })
                columns.forEach(col => {
                    hasFixedLeft && col.placeLeft && (col.fixed = 'left')
                    hasFixedRight && col.placeRight && (col.fixed = 'right')
                })
                this.$emit('collect', columns)
            },
        }
    }
</script>

<style lang="scss">
    .pl-base-table-column-controller {
        display: none;
    }
</style>