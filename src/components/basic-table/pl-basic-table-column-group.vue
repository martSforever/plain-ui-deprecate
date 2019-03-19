<template>
    <div class="pl-basic-table-column-group">
        <slot></slot>
    </div>
</template>

<script>
    import {BasicColumnGroupMixin, TableColumnGroup} from "./mixins";

    export default {
        name: "pl-basic-table-column-group",
        mixins: [BasicColumnGroupMixin],
        methods: {
            col() {
                const colGroup = new TableColumnGroup(this)
                this.$set(colGroup, 'isGroup', true)
                const children = this.$children.reduce((ret, item) => {
                    const c = item.col()
                    c.fixed = colGroup.fixed
                    ret.push(c)
                    return ret
                }, [])
                this.$set(colGroup, 'children', children)
                return colGroup
            },
        }
    }
</script>

<style lang="scss">

</style>