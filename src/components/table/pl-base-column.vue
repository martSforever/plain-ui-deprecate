<template>
    <span class="pl-base-column" :field="field"><slot :row="{}" :col="{}" :row-index="null" :col-index="null"></slot></span>
</template>

<script>
    import {ColumnMixin} from "../table-columns/mixins";

    export default {
        name: "pl-base-column",
        mixins: [ColumnMixin],
        watch: {
            width(val) {
                if (this.p_width !== val) this.p_width = val;
            },
            p_width(val) {
                this.$parent.$emit('update:width', val);
            },
            fixed(val) {
                if (this.p_fixed !== val) this.p_fixed = val;
            },
            p_fixed(val) {
                this.$emit('update:fixed', val);
            },
            order(val) {
                if (this.p_order !== val) this.p_order = val;
            },
            p_order(val) {
                this.$parent.$emit('update:order', val);
            },
        },
        data() {
            return {
                p_initTitle: this.title,
                p_title: this.title,
                p_initWidth: this.width,
                p_width: this.width,
                p_initOrder: this.order,
                p_order: this.order,
                p_initFixed: this.fixed,
                p_fixed: this.fixed,
                p_initHide: this.hide,
                p_hide: this.hide,
            }
        },
        computed: {
            col() {
                const that = this;
                /*@formatter:off*/
                const col = {
                    get title() {return that.p_title},
                    get previousTitle(){return that.title},
                    get field() {return that.field},
                    get width() {return that.p_width},
                    get order() {return that.p_order+(that.p_fixed === 'left'?999:that.p_fixed === 'right'?-999:0)},
                    get fixed() {return that.p_fixed},
                    get hide() {return that.p_hide},
                    get search() {return that.search},
                    get sort() {return that.sort},
                    get quickFilter() {return that.quickFilter},
                    get filterName() {return that.filterName},
                    get filterOption() {return that.filterOption},
                    get lov() {return that.lov},
                    get placeLeft() {return that.placeLeft},
                    get placeRight() {return that.placeRight},
                    get align() {return that.align},
                    get disabledConfig(){return that.disabledConfig},
                    get editable(){return that.editable},

                    get titleScopedSlot() {return that.$scopedSlots.title},
                    get colScopedSlot() {return that.$scopedSlots.default},

                    set fixed(val){that.p_fixed = val},
                    set order(val){that.p_order = val},
                    set title(val){that.p_title = val},
                    set hide(val){that.p_hide = val},
                    update({width}){
                        that.p_width = width
                    },
                    reset(){
                        that.p_width = that.p_initWidth
                        that.p_title = that.p_initTitle
                        that.p_fixed = that.p_initFixed
                        that.p_hide = that.p_initHide
                    },
                }
                /*@formatter:on*/
                return col
            },
        },
    }
</script>