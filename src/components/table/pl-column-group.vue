<template>
    <div className="pl-column-group">
        <slot></slot>
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-column-group",
        mixins: [MountedMixin],
        props: {
            title: {},                                  //多级表头标题
            order: {type: Number, default: 0},          //多级表头排序序号
            fixed: {type: String, default: 'center'},   //多级表头固定位置
            placeLeft: {type: Boolean},                 //当出现左滚动列的时候，是否自动设置为左固定列
            placeRight: {type: Boolean},                //当出现右滚动列的时候，是否自动设置为右固定列

            isCtrlGroup: {type: Boolean},               //是否为列控制器服务
        },
        watch: {
            fixed(val) {
                if (this.p_fixed !== val) this.p_fixed = val;
            },
            p_fixed(val) {
                this.$emit('update:fixed', val);
            },
        },
        data() {
            return {
                p_fixed: this.fixed,
                group: true,
            }
        },
        methods: {
            getCol() {
                const that = this
                /*@formatter:off*/
                const col = {
                    get title() {return that.title},
                    get order() {return that.order+(that.p_fixed === 'left'?999:that.p_fixed === 'right'?-999:0)},
                    get fixed() {return that.p_fixed},

                    set fixed(val){that.p_fixed = val},
                }
                /*@formatter:on*/
                const children = this.$children.reduce((ret, item) => {
                    if (item.$options._componentTag === 'pl-render-func') {
                        item.$children.forEach(c => ret.push(c.group ? c.getCol() : c.col))
                    } else {
                        const c = item.group ? item.getCol() : item.col
                        !this.isCtrlGroup && (c.fixed = this.p_fixed)
                        ret.push(c)
                    }
                    return ret
                }, [])
                return {...col, children, group: true}
            },
        },
    }
</script>
