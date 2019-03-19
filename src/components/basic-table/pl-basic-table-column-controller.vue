<template>
    <div class="pl-basic-table-column-controller">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "pl-basic-table-column-controller",
        mounted() {
            this.collect()
        },
        methods: {
            collect() {
                const cols = this.getColumnData(this)
                console.log(cols)
            },
            getColumnData(context) {
                switch (context.$options.name) {
                    case 'pl-basic-table-column':
                        return context.col()
                    case 'pl-basic-table-column-group':
                        return context.col()
                    default:
                        const ret = []
                        context.$children.forEach(child => {
                            const col = this.getColumnData(child)
                            // console.log(col, child.$options.name)
                            if (this.$plain.$utils.typeOf(col) === 'object') {
                                ret.push(col)
                            } else {
                                ret.push(...col)
                            }
                        })
                        return ret
                }
            },
        }
    }
</script>

<style lang="scss">

</style>