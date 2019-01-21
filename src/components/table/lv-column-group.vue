<template>
    <div className="lv-column-group">
        <slot></slot>
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";

    export default {
        name: "lv-column-group",
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
                if (this.lv_fixed !== val) this.lv_fixed = val;
            },
            lv_fixed(val) {
                this.$emit('update:fixed', val);
            },
        },
        data() {
            return {
                lv_fixed: this.fixed,
                group: true,
            }
        },
        methods: {
            getCol() {
                const that = this
                /*@formatter:off*/
                const col = {
                    get title() {return that.title},
                    get order() {return that.order+(that.lv_fixed === 'left'?999:that.lv_fixed === 'right'?-999:0)},
                    get fixed() {return that.lv_fixed},

                    set fixed(val){that.lv_fixed = val},
                }
                /*@formatter:on*/
                const children = this.$children.reduce((ret, item) => {
                    if (item.$options._componentTag === 'link-rendering-render-func') {
                        item.$children.forEach(c => {
                            ret.push(c.group ? c.getCol() : c.col)
                        })
                    } else {
                        const c = item.group ? item.getCol() : item.col
                        !this.isCtrlGroup && (c.fixed = this.lv_fixed)
                        ret.push(c)
                    }
                    return ret
                }, [])
                return {...col, children, group: true}
            },
        },
    }
</script>
