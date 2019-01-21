<template>
    <div class="lv-table-column-controller">
        <lv-column-group ref="group" is-ctrl-group>
            <slot></slot>
        </lv-column-group>
    </div>
</template>

<script>
    import LvColumnGroup from "./lv-column-group";

    export default {
        name: "lv-table-column-controller",
        components: {LvColumnGroup},
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
    .lv-table-column-controller {
        display: none;
    }
</style>