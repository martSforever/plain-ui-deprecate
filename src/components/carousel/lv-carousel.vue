<template>
    <div class="lv-carousel">
        <div class="lv-carousel-content" :style="contentStyles" :class="{'lv-carousel-content-moving':!!lv_moving}">
            <div class="lv-carousel-item" v-for="(item,index) in data" :key="index">
                <slot :item="item" :index="index"></slot>
            </div>
        </div>
        <div class="lv-carousel-dot" v-if="!disabledDot">
            <div class="lv-carousel-dot-item"
                 v-for="(item,index) in data"
                 @click.stop="lv_clickDot(item,index)"
                 :key="index" :class="{'lv-carousel-dot-item-active':index === currentValue}">
            </div>
        </div>
        <div class="lv-carousel-prev-button" @click="lv_clickButton(false)" v-if="!disabledButton">
            <lv-icon icon="lv-arrow-left-light"/>
        </div>
        <div class="lv-carousel-next-button" @click="lv_clickButton(true)" v-if="!disabledButton">
            <lv-icon icon="lv-arrow-right-light"/>
        </div>
        <slot name="hover"></slot>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";
    import LvIcon from "../icon/lv-icon";

    export default {
        name: "lv-carousel",
        components: {LvIcon},
        mixins: [ValueMixin],
        props: {
            data: {type: Array, default: () => []},                     //遍历的数组数据
            disabledSwipe: {type: Boolean,},                            //禁用滑动
            autoPlay: {type: Boolean},                                  //自定播放
            autoPlayDuration: {type: Number, default: 3000},            //自动播放的时间间隔
            disabledButton: {type: Boolean},                            //禁用左右翻页按钮
            disabledDot: {type: Boolean},                               //禁用指示器
        },
        watch: {
            value(val) {
                if (this.currentValue !== val && val > -1 && val < this.data.length) {
                    this.currentValue = val
                    this.lv_x = -val * this.lv_containerWidth
                }
            },
        },
        data() {
            return {
                lv_watchValue: false,

                lv_containerWidth: 0,
                lv_startX: 0,
                lv_x: 0,
                lv_tempX: 0,
                lv_moving: false,
                lv_timer: null,
            }
        },
        mounted() {
            this.lv_containerWidth = this.$el.offsetWidth
            !this.disabledSwipe && this.$el.addEventListener('mousedown', this.lv_mousedown)
            this.play()

            if (!this.data || this.data.length === 0) return
            this.currentValue = this.value == null ? 0 : this.value
            this.update()
        },
        computed: {
            contentStyles() {
                return {
                    transform: `translateX(${this.lv_x}px)`,
                }
            },
        },
        methods: {
            next() {
                if (!this.data || this.data.length === 0) return
                const target = this.currentValue + 1
                const last = this.data.length - 1
                this.currentValue = target > last ? last : target
                this.update()
            },
            prev() {
                if (!this.data || this.data.length === 0) return
                const target = this.currentValue - 1
                this.currentValue = target < 0 ? 0 : target
                this.update()
            },
            update() {
                this.lv_x = -this.currentValue * this.lv_containerWidth
            },
            play() {
                if (!this.autoPlay || !this.data || this.data.length === 0) return
                if (this.currentValue === this.data.length - 1) this.currentValue = -1
                this.lv_clearTimer()
                this.timer = setTimeout(() => {
                    this.next()
                    this.play()
                }, this.autoPlayDuration)
            },
            lv_clickButton(next = true) {
                this.play()
                next ? this.next() : this.prev()
            },
            lv_clearTimer() {
                if (!!this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
            },
            lv_clickDot(item, index) {
                this.currentValue = index
                this.update()
            },
            lv_mousedown(e) {
                this.lv_clearTimer()
                this.lv_moving = true
                this.lv_tempX = this.lv_x
                this.lv_startX = e.clientX
                window.document.addEventListener('mousemove', this.lv_mousemove)
                window.document.addEventListener('mouseup', this.lv_mouseup)
                this.$plain.$dom.enableSelectNone()
            },
            lv_mousemove(e) {
                if (!this.lv_moving) return
                let deltaX = e.clientX - this.lv_startX;
                this.lv_x = deltaX + this.lv_tempX
            },
            lv_mouseup(e) {
                if (!this.lv_moving) return
                this.lv_moving = false
                if (this.lv_x > 0) {
                    this.lv_x = 0
                    this.currentValue = 0
                    return
                }
                const x = -this.lv_x
                for (let i = 0; i < this.data.length - 1; i++) {
                    const current = i * this.lv_containerWidth
                    const next = (i + 1) * this.lv_containerWidth
                    const half = (current + next) / 2
                    if (current <= x && x <= half) {
                        this.lv_x = -current
                        this.currentValue = i
                        this.play()
                        return
                    }
                    if (half <= x && x <= next) {
                        this.lv_x = -next
                        this.currentValue = i + 1
                        this.play()
                        return
                    }
                }
                this.lv_x = -(this.data.length - 1) * this.lv_containerWidth
                this.currentValue = this.data.length - 1
                this.$plain.$dom.disabledSelectNone()
                window.document.removeEventListener('mousemove', this.lv_mousemove)
                window.document.removeEventListener('mouseup', this.lv_mouseup)
                this.play()
            },
        }
    }
</script>

<style lang="scss">
    .lv-carousel {
        @include public-style;
        overflow: hidden;
        display: inline-block;
        position: relative;
        &, & .lv-carousel-content, & .lv-carousel-item {
            height: 100%;
            width: 100%;
        }
        .lv-carousel-content {
            @include transition-all-cubic-bezier;
            white-space: nowrap;
            position: relative;
            &.lv-carousel-content-moving {
                transition: initial;
            }
            .lv-carousel-item {
                display: inline-block;
            }
        }
        $dot-size: 9px;
        .lv-carousel-dot {
            position: absolute;
            bottom: 12px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .lv-carousel-dot-item {
                @include transition-all-cubic-bezier;
                height: $dot-size/3;
                width: $dot-size;
                border-radius: $dot-size;
                background-color: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                &:not(:last-child) {
                    margin-right: $dot-size;
                }
                &.lv-carousel-dot-item-active {
                    background-color: rgba(255, 255, 255, 1);
                    width: 2.5*$dot-size;
                }
            }
        }

        .lv-carousel-prev-button, .lv-carousel-next-button {
            @include transition-all-cubic-bezier;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 13%;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 12px;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            opacity: 0;
            .lv-icon {
                width: 100%;
                height: auto;
            }
            &.lv-carousel-prev-button {
                left: 0;
                background: linear-gradient(-90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
                transform: translateX(-25%);
            }
            &.lv-carousel-next-button {
                right: 0;
                background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
                transform: translateX(25%);
            }
        }

        &:hover {
            .lv-carousel-prev-button, .lv-carousel-next-button {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
</style>