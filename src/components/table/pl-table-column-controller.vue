<template>
    <div class="pl-table-column-controller">
        <pl-column-group ref="group" is-ctrl-group>
            <slot></slot>
        </pl-column-group>
    </div>
</template>

<script>
    import PlColumnGroup from "./pl-column-group";

    export default {
        name: "pl-table-column-controller",
        components: {PlColumnGroup},
        mounted() {
            this.collect()
        },
        methods: {
            collect() {
                const columns = this.$refs.group.getCol().children
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
    .pl-table-column-controller {
        display: none;
    }
</style>