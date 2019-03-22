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
        data() {
            return {
                observer: new MutationObserver(() => this.pl_detect()),
                timer: null,
            }
        },
        mounted() {
            this.collect()
            this.observer.observe(this.$el, {childList: true, subtree: true})
        },
        methods: {
            collect() {
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
            pl_detect() {
                this.collect()
            },
            pl_refresh() {
                if (!!this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
                this.timer = setTimeout(() => this.collect(), 100)
            },
        }
    }
</script>

<style lang="scss">
    .pl-table-column-controller {
        display: none;
    }
</style>