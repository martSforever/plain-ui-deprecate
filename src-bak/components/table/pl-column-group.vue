<template>
    <div class="pl-column-group">
        <slot></slot>
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";
    import {ColumnGroupProps, TableColumnGroup} from "../table-columns/mixins";

    export default {
        name: "pl-column-group",
        mixins: [MountedMixin],
        props: ColumnGroupProps,
        methods: {
            col() {
                const col = new TableColumnGroup(this)
                /*@formatter:on*/
                const children = this.$children.reduce((ret, item) => {
                    if (item.$options._componentTag === 'pl-render-func') {
                        item.$children.forEach(c => ret.push(c.col()))
                    } else {
                        ret.push(item.col())
                    }
                    return ret
                }, [])
                this.$set(col, 'children', children)
                col.group = true
                return col
            },
        },
    }
</script>
