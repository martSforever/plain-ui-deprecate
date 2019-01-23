<template>
    <div class="pl-table-body">
        <pl-table-body-item
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

                @scroll="e=>p_scroll(e,fixed)"
                @mouseenter.native="p_hoverFixed = fixed"
        />
    </div>
</template>

<script>
    import {TableMixin} from "./index";
    import PlTableBodyItem from "./pl-table-body-item";

    export default {
        name: "pl-table-body",
        components: {PlTableBodyItem},
        mixins: [TableMixin],
        data() {
            return {
                fixeds: ['center', 'left', 'right'],                                        //固定列位置，用于循环
                p_hoverFixed: null,                                                        //当前鼠标hover的位置：center、left、right，用于判断滚动
                p_calculateTimer: null,                                                    //计算左右滚动的计时器
                baseTable: null,                                                            //baseTable父对象
            }
        },
        mounted() {
            this.baseTable = this.$plain.$dom.findComponentUpward(this, 'pl-base-table')
            this.p_calculateScrollDuration()
        },
        methods: {
            p_scroll(e, fixed) {
                if (fixed === 'center') this.$emit('scroll', e)
                if (fixed !== this.p_hoverFixed) return
                this.fixeds.forEach(ifixed => {
                    if (!!fixed === ifixed) return
                    if (!!this.$refs[ifixed] && this.$refs[ifixed].length === 1) {
                        this.$refs[ifixed][0].$refs.scroll.setScroll({y: e.target.scrollTop})
                    }
                })
                this.p_calculateScrollDuration()
            },
            p_calculateScrollDuration() {
                if (!!this.p_calculateTimer) {
                    clearTimeout(this.p_calculateTimer)
                    this.p_calculateTimer = null
                }
                this.p_calculateTimer = setTimeout(() => {
                    if (!!this.baseTable.p_stretchTable) return
                    const wrapper = this.$refs.center[0].$refs.scroll.$refs.wrapper
                    this.baseTable.$emit('scrollLeft', wrapper.scrollLeft === 0)
                    this.baseTable.$emit('scrollRight', Math.abs(wrapper.scrollWidth - wrapper.scrollLeft - wrapper.offsetWidth + 17) < 1)
                }, 50)
            },
        }
    }
</script>

<style lang="scss">
    .pl-table-body {
        position: relative;
        overflow-x: hidden;
        tr:not(.pl-table-column):not(:last-child) {
            .pl-table-cell {
                border-bottom: solid $base-table-border-size $base-table-border-color;
                border-top: solid $base-table-border-size transparent;
            }
        }
    }
</style>