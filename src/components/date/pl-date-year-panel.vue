<template>
    <div class="pl-date-year-panel">
        <pl-scroll ref="scrollbar"
                   @vertical-scroll-top="p_addPreviousYears"
                   @vertical-scroll-bottom="p_addNextYears">
            <div class="pl-date-year-panel-content">
                <div class="pl-date-year-panel-item-wrapper" v-for="(item,index) in list" :key="index">
                    <div class="pl-date-year-panel-item"
                         ref="items"
                         :class="{
                            'pl-date-year-panel-item-active':item === currentYear,
                            'pl-date-year-panel-item-pick-year':item === currentValue,
                            'pl-date-year-panel-item-now':nowYear===item,
                         }"
                         @click="p_clickItem(item,index)">
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
                p_watchCurrentValue: false,             //不监听currentValue变化事件
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
            /*
             *  重新计算年份数组
             *  @author     martsforever
             *  @datetime   2019/3/4 22:32
             */
            reset() {
                this.list = []
                this.start = this.value - Math.floor(this.num * 1.5)
                for (let i = this.start; i < this.start + this.num * 3; i++) this.list.push(i)
                this.$nextTick(() => this.currentValue = this.value)
            },
            /*
             *  更新滚动条位置，
             *  @author     martsforever
             *  @datetime   2019/3/4 22:32
             */
            updatePosition() {
                this.$nextTick(() => {
                    const targetItemRef = this.$refs.items[this.currentIndex - 6]
                    !!targetItemRef && this.$refs.scrollbar.scrollTop(targetItemRef.offsetTop)
                })
            },
            /*
             *  滚动到顶部时，年份数组栈顶部添加额外年份
             *  @author     martsforever
             *  @datetime   2019/3/4 22:42
             */
            p_addPreviousYears() {
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
            /*
             *  滚动到底部时，年份数组栈尾部添加额外年份
             *  @author     martsforever
             *  @datetime   2019/3/4 22:42
             */
            p_addNextYears() {
                let addStart = this.list[this.list.length - 1]
                for (let i = 0; i < this.num; i++) {
                    this.list.push(++addStart)
                }
            },
            /*
             *  处理年份点击事件
             *  @author     martsforever
             *  @datetime   2019/3/4 22:34
             */
            p_clickItem(item) {
                this.currentValue = item
                this.$emit('input', item)
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
                font-size: 12px;
                .pl-date-year-panel-item {
                    padding: 4px 9px;
                    cursor: pointer;
                    border-radius: 4px;
                    &:hover, &.pl-date-year-panel-item-pick-year {
                        background-color: $color-primary-light;
                    }
                    &.pl-date-year-panel-item-now {
                        background-color: $color-success;
                        color: white;
                    }
                    &.pl-date-year-panel-item-active {
                        background-color: $color-primary;
                        color: white;
                    }
                }
            }
        }
    }
</style>