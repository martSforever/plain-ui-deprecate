<template>
    <div class="pl-scroll-option" :style="styles">
        <div class="pl-scroll-option-wrapper" @scroll="p_scroll" ref="wrapper">
            <div class="pl-scroll-option-item" v-for="(item) in [1,2,3]" :key="`_${item}`" :style="itemStyles"></div>
            <div class="pl-scroll-option-item"
                 v-for="(item,index) in data"
                 :key="index"
                 :style="itemStyles"
                 @click="p_click(item,index)">
                {{index}},{{!!labelKey ? item[labelKey] : item}}
            </div>
            <div class="pl-scroll-option-item" v-for="(item) in [1,2,3]" :key="`${item}_`" :style="itemStyles"></div>
        </div>
        <div class="pl-scroll-option-shadow-top" :style="{height:`${itemNum*itemHeight}px`}"></div>
        <div class="pl-scroll-option-shadow-bottom" :style="{height:`${itemNum*itemHeight}px`}"></div>
    </div>
</template>

<script>

    const scroll = require('scroll');

    export default {
        name: "pl-scroll-option",
        props: {
            data: {type: Array, required: true},
            labelKey: {type: String},
            valueKey: {type: String},
            itemHeight: {type: Number, default: 24},
            itemNum: {type: Number, default: 3},
        },
        data() {
            return {
                scrollTop: 0,
                timer: null,
                listenScroll: true,
                p_index: 0,
            }
        },
        computed: {
            styles() {
                return {
                    height: `${this.itemHeight * ((this.itemNum * 2) + 1)}px`
                }
            },
            itemStyles() {
                return {
                    height: `${this.itemHeight}px`
                }
            },
        },
        methods: {
            p_scroll(e) {
                this.scrollTop = e.target.scrollTop
                this.$emit('scroll', this.scrollTop)
                this.listenScroll && this.p_scrollEnd(e)
            },
            p_click(item, index) {
                this.p_scrollTo(index)
            },
            p_scrollEnd(e) {
                this.p_clearTimer()
                this.timer = setTimeout(() => {
                    if (this.scrollTop % this.itemHeight === 0) {
                        this.p_updateIndex()
                        return
                    }
                    this.listenScroll = false
                    for (let i = 0; i < this.data.length + (this.itemNum * 2); i++) {
                        let start = this.itemHeight * i
                        let end = this.itemHeight * (i + 1)
                        if (start < this.scrollTop && this.scrollTop < end) {
                            scroll.top(e.target, start);
                            setTimeout((() => {
                                this.listenScroll = true
                                this.p_updateIndex()
                            }), 300)
                        }
                    }
                }, 300)
            },
            p_clearTimer() {
                if (this.timer != null) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
            },
            p_updateIndex() {
                this.p_index = Math.floor((this.scrollTop / this.itemHeight))
                console.log(this.p_index)
            },
            p_scrollTo(index) {
                this.listenScroll = false
                this.p_index = index
                scroll.top(this.$refs.wrapper, (index) * this.itemHeight);
                setTimeout((() => this.listenScroll = true), 300)
            },
        }
    }
</script>

<style lang="scss">
    .pl-scroll-option {
        @include public-style;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border: solid 1px #ddd;
        position: relative;
        .pl-scroll-option-wrapper {
            width: calc(100% + 17px);
            height: 100%;
            overflow-y: scroll;
            position: absolute;
            top: 0;
            .pl-scroll-option-item {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-sizing: border-box;
                cursor: pointer;
                user-select: none;

                transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
                transition-duration: 0ms;

                &:not(:last-child) {
                    font-size: 12px;
                    color: $color-normal-sub-color;
                }
            }
        }
        .pl-scroll-option-shadow-top, .pl-scroll-option-shadow-bottom {
            position: absolute;
            left: 0;
            right: 0;
            z-index: -1;
        }
        .pl-scroll-option-shadow-top {
            top: 0;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent);
            border-bottom: solid #ddd 1px;
        }
        .pl-scroll-option-shadow-bottom {
            bottom: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.15), transparent);
            border-top: solid #ddd 1px;
        }
    }
</style>