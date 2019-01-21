<template>
    <div class="lv-table-body">
        <lv-table-body-item
                v-for="(fixed,index) in fixeds"
                v-if="fixedExist[fixed]"
                :ref="fixed"
                :key="index"
                :fixed="fixed"
                :body-columns="bodyColumns"
                :fixed-exist="fixedExist"
                :data="data"
                :edit-data="editData"
                :row-height="rowHeight"
                :row-num="rowNum"

                @scroll="e=>lv_scroll(e,fixed)"
                @mouseenter.native="lv_hoverFixed = fixed"
        />
    </div>
</template>

<script>
    import {TableMixin} from "./index";
    import LvTableBodyItem from "./lv-table-body-item";

    export default {
        name: "lv-table-body",
        components: {LvTableBodyItem},
        mixins: [TableMixin],
        data() {
            return {
                fixeds: ['center', 'left', 'right'],                                        //固定列位置，用于循环
                lv_hoverFixed: null,                                                        //当前鼠标hover的位置：center、left、right，用于判断滚动
                lv_calculateTimer: null,                                                    //计算左右滚动的计时器
                baseTable: null,                                                            //baseTable父对象
            }
        },
        mounted() {
            this.baseTable = this.$plain.$dom.findComponentUpward(this, 'lv-base-table')
            this.lv_calculateScrollDuration()
        },
        methods: {
            lv_scroll(e, fixed) {
                if (fixed === 'center') this.$emit('scroll', e)
                if (fixed !== this.lv_hoverFixed) return
                this.fixeds.forEach(ifixed => {
                    if (!!fixed === ifixed) return
                    if (!!this.$refs[ifixed] && this.$refs[ifixed].length === 1) {
                        this.$refs[ifixed][0].$refs.scroll.setScroll({y: e.target.scrollTop})
                    }
                })
                this.lv_calculateScrollDuration()
            },
            lv_calculateScrollDuration() {
                if (!!this.lv_calculateTimer) {
                    clearTimeout(this.lv_calculateTimer)
                    this.lv_calculateTimer = null
                }
                this.lv_calculateTimer = setTimeout(() => {
                    if (!!this.baseTable.lv_stretchTable) return
                    const wrapper = this.$refs.center[0].$refs.scroll.$refs.wrapper
                    this.baseTable.$emit('scrollLeft', wrapper.scrollLeft === 0)
                    this.baseTable.$emit('scrollRight', Math.abs(wrapper.scrollWidth - wrapper.scrollLeft - wrapper.offsetWidth + 17) < 1)
                }, 50)
            },
        }
    }
</script>

<style lang="scss">
    .lv-table-body {
        position: relative;
        overflow-x: hidden;
        tr:not(.lv-table-column):not(:last-child) {
            .lv-table-cell {
                border-bottom: solid $base-table-border-size $base-table-border-color;
            }
        }
    }
</style>