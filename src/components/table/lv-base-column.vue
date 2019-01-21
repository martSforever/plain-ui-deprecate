<template>
    <span class="lv-base-column" :field="field"><slot :row="{}" :col="{}" :row-index="null" :col-index="null"></slot></span>
</template>

<script>
    import {ColumnMixin} from "../table-columns/mixins";

    export default {
        name: "lv-base-column",
        mixins: [ColumnMixin],
        watch: {
            width(val) {
                if (this.p_width !== val) this.p_width = val;
            },
            p_width(val) {
                this.$emit('update:width', val);
            },
            fixed(val) {
                if (this.p_fixed !== val) this.p_fixed = val;
            },
            p_fixed(val) {
                this.$emit('update:fixed', val);
            },
        },
        data() {
            return {
                p_width: this.width,
                p_fixed: this.fixed,
            }
        },
        computed: {
            col() {
                const that = this;
                /*@formatter:off*/
                const col = {
                    get title() {return that.title},
                    get field() {return that.field},
                    get width() {return that.p_width},
                    get order() {return that.order+(that.p_fixed === 'left'?999:that.p_fixed === 'right'?-999:0)},
                    get fixed() {return that.p_fixed},
                    get search() {return that.search},
                    get sort() {return that.sort},
                    get quickFilter() {return that.quickFilter},
                    get filterName() {return that.filterName},
                    get filterOption() {return that.filterOption},
                    get lov() {return that.lov},
                    get placeLeft() {return that.placeLeft},
                    get placeRight() {return that.placeRight},
                    get align() {return that.align},

                    get titleScopedSlot() {return that.$scopedSlots.title},
                    get colScopedSlot() {return that.$scopedSlots.default},

                    set fixed(val){that.p_fixed = val},
                    update({width}){that.p_width = width},
                }
                /*@formatter:on*/
                return col
            },
        },
    }
</script>