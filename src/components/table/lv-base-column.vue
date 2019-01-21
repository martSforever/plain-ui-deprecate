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
                if (this.lv_width !== val) this.lv_width = val;
            },
            lv_width(val) {
                this.$emit('update:width', val);
            },
            fixed(val) {
                if (this.lv_fixed !== val) this.lv_fixed = val;
            },
            lv_fixed(val) {
                this.$emit('update:fixed', val);
            },
        },
        data() {
            return {
                lv_width: this.width,
                lv_fixed: this.fixed,
            }
        },
        computed: {
            col() {
                const that = this;
                /*@formatter:off*/
                const col = {
                    get title() {return that.title},
                    get field() {return that.field},
                    get width() {return that.lv_width},
                    get order() {return that.order+(that.lv_fixed === 'left'?999:that.lv_fixed === 'right'?-999:0)},
                    get fixed() {return that.lv_fixed},
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

                    set fixed(val){that.lv_fixed = val},
                    update({width}){that.lv_width = width},
                }
                /*@formatter:on*/
                return col
            },
        },
    }
</script>