<template>
    <div class="pl-scroll-option" :style="styles">
        <div class="pl-scroll-option-wrapper" @scroll="p_scroll" ref="wrapper">
            <pl-scroll-option-item v-for="(item) in externalData" :key="`top_${item}`"/>
            <pl-scroll-option-item
                    v-for="(item,index) in data"
                    :key="index"

                    :label-key="labelKey"
                    :value-key="valueKey"
                    :item-num="itemNum"
                    :item-height="itemHeight"
                    :index="index"
                    :scroll-top="scrollTop"
                    @click="p_click(item,index)">
                {{!!labelKey ? item[labelKey] : item}}
            </pl-scroll-option-item>
            <pl-scroll-option-item v-for="(item) in externalData" :key="`bottom_${item}`"/>
        </div>
        <div class="pl-scroll-option-shadow-top" :style="{height:`${itemNum*itemHeight}px`}"></div>
        <div class="pl-scroll-option-shadow-bottom" :style="{height:`${itemNum*itemHeight}px`}"></div>
    </div>
</template>

<script>

    import PlScrollOptionItem from "./pl-scroll-option-item";

    const scroll = require('scroll');

    export default {
        name: "pl-scroll-option",
        components: {PlScrollOptionItem},
        props: {
            value: {},
            data: {type: Array, required: true},
            labelKey: {type: String},
            valueKey: {type: String},
            itemHeight: {type: Number, default: 24},
            itemNum: {type: Number, default: 3},
            width: {type: Number, default: 100},
        },
        data() {
            return {
                p_value: this.value,
                scrollTop: 0,
                timer: null,
                listenScroll: true,
                p_index: 0,
            }
        },
        watch: {
            value(val) {
                if (val !== this.p_value) {
                    this.p_updateByValue()
                }
            },
        },
        mounted() {
            if (this.value != null) this.p_updateByValue()
        },
        computed: {
            styles() {
                const styles = {height: `${this.itemHeight * ((this.itemNum * 2) + 1)}px`}
                this.width != null && (styles.width = this.width + 'px')
                return styles
            },
            externalData() {
                const ret = []
                let i = 0
                while (i < this.itemNum) {
                    ret.push(i)
                    i++
                }
                return ret
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
                this.p_emitValue()
            },
            p_scrollTo(index) {
                this.listenScroll = false
                this.p_index = index
                this.p_emitValue();
                scroll.top(this.$refs.wrapper, (index) * this.itemHeight);
                setTimeout((() => this.listenScroll = true), 300)
            },
            p_emitValue() {
                this.p_value = this.p_getValue(this.data[this.p_index])
                this.$emit('input', this.p_value)
            },
            p_updateByValue() {
                for (let i = 0; i < this.data.length; i++) {
                    const item = this.data[i];
                    if (this.p_getValue(item) === this.value) {
                        scroll.top(this.$refs.wrapper, (i) * this.itemHeight);
                    }
                }
            },
            p_getValue(item) {
                return !!this.valueKey ? item[this.valueKey] : item
            },
        }
    }
</script>

<style lang="scss">
    .pl-scroll-option {
        @include public-style;
        height: 100%;
        overflow: hidden;
        border: solid 1px #ddd;
        position: relative;
        display: inline-block;
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