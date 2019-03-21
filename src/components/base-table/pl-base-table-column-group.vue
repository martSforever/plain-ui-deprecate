<template>
    <div class="pl-base-table-column-group">
        <slot></slot>
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";
    import {BasicColumnGroupMixin, TableColumnGroup} from "./mixin";

    export default {
        name: "pl-base-table-column-group",
        mixins: [MountedMixin, BasicColumnGroupMixin],
        data() {
            return {
                group: true,
            }
        },
        methods: {
            col() {
                /*@formatter:off*/
                const col = new TableColumnGroup(this)
                /*@formatter:on*/
                const children = this.$children.reduce((ret, item) => {
                    if (item.$options._componentTag === 'pl-render-func') {
                        item.$children.forEach(c => ret.push(c.col()))
                    } else {
                        const c = item.col()
                        ret.push(c)
                    }
                    return ret
                }, [])
                this.$set(col, 'children', children)
                return col
            },
        },
    }
</script>
