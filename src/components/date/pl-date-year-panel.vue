<template>
    <div class="pl-date-year-panel">
        <pl-scroll ref="scrollbar">
            <div class="pl-date-year-panel-content">
                <div class="pl-date-year-panel-item-wrapper" v-for="(item,index) in list" :key="index">
                    <div class="pl-date-year-panel-item"
                         ref="items"
                         :class="{'pl-date-year-panel-item-active':item === currentYear,'currentYear-now':nowYear===item}"
                         @click="handleClickItem(item,index)">
                        {{item}}
                    </div>
                </div>
            </div>
        </pl-scroll>
    </div>
</template>

<script>
    import PlScroll from "../scroll/pl-scroll";
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-date-year-panel",
        components: {PlScroll},
        mixins: [ValueMixin],
        props: {
            currentYear: {},
        },
        data() {
            return {
                p_watchCurrentValue: false,
                list: [],                               //年份数组
                num: 15,                                //每一页显示的个数
                nowYear: new Date().getFullYear(),      //当前年份
                start: null,                            //档期年份数组的起始年份
            }
        },
        computed: {
            currentIndex() {
                return this.list.indexOf(this.currentValue)
            },
        },
        async created() {
            this.reset()
            await this.$plain.$utils.delay()
            this.updatePosition()
        },
        methods: {
            reset() {
                this.list = []
                this.start = this.value - Math.floor(this.num * 1.5)
                for (let i = this.start; i < this.start + this.num * 3; i++) this.list.push(i)
                this.$nextTick(() => this.currentValue = this.value)
            },
            updatePosition() {
                this.$nextTick(() => {
                    const targetItemRef = this.$refs.items[this.currentIndex - 6]
                    !!targetItemRef && this.$refs.scrollbar.scrollTop(targetItemRef.offsetTop)
                })
            },
            addPreviousYears() {
                let currentScrolllTop = this.$refs.scrollbar.contentWrapperScrollTop
                const newStart = this.start - this.num
                for (let i = this.start - 1; i >= newStart; i--) {
                    this.list.unshift(i)
                }
                this.start = newStart
                this.$nextTick(() => {
                    this.$refs.scrollbar.$refs.wrapper.scrollTop = currentScrolllTop + this.$el.offsetHeight
                })
            },
            addNextYears() {
                let addStart = this.list[this.list.length - 1]
                for (let i = 0; i < this.num; i++) {
                    this.list.push(++addStart)
                }
            },

            handleClickItem(item) {
                this.currentValue = item
                this.$emit('click', item)
            },
        },

    }
</script>

<style lang="scss">
    .pl-date-year-panel {
        @include public-style;
        width: 100%;
        height: 100%;
        padding: 9px;
        .pl-date-year-panel-content {
            width: 178px;
            .pl-date-year-panel-item-wrapper {
                display: inline-flex;
                width: 33.33%;
                align-items: center;
                justify-content: center;
                height: 44px;
            }
        }
    }
</style>