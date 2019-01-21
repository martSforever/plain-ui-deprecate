<template>
    <div class="pl-carousel">
        <div class="pl-carousel-content" :style="contentStyles" :class="{'pl-carousel-content-moving':!!p_moving}">
            <div class="pl-carousel-item" v-for="(item,index) in data" :key="index">
                <slot :item="item" :index="index"></slot>
            </div>
        </div>
        <div class="pl-carousel-dot" v-if="!disabledDot">
            <div class="pl-carousel-dot-item"
                 v-for="(item,index) in data"
                 @click.stop="p_clickDot(item,index)"
                 :key="index" :class="{'pl-carousel-dot-item-active':index === currentValue}">
            </div>
        </div>
        <div class="pl-carousel-prev-button" @click="p_clickButton(false)" v-if="!disabledButton">
            <pl-icon icon="pl-arrow-left-light"/>
        </div>
        <div class="pl-carousel-next-button" @click="p_clickButton(true)" v-if="!disabledButton">
            <pl-icon icon="pl-arrow-right-light"/>
        </div>
        <slot name="hover"></slot>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-carousel",
        components: {PlIcon},
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
                    this.p_x = -val * this.p_containerWidth
                }
            },
        },
        data() {
            return {
                p_watchValue: false,

                p_containerWidth: 0,
                p_startX: 0,
                p_x: 0,
                p_tempX: 0,
                p_moving: false,
                p_timer: null,
            }
        },
        mounted() {
            this.p_containerWidth = this.$el.offsetWidth
            !this.disabledSwipe && this.$el.addEventListener('mousedown', this.p_mousedown)
            this.play()

            if (!this.data || this.data.length === 0) return
            this.currentValue = this.value == null ? 0 : this.value
            this.update()
        },
        computed: {
            contentStyles() {
                return {
                    transform: `translateX(${this.p_x}px)`,
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
                this.p_x = -this.currentValue * this.p_containerWidth
            },
            play() {
                if (!this.autoPlay || !this.data || this.data.length === 0) return
                if (this.currentValue === this.data.length - 1) this.currentValue = -1
                this.p_clearTimer()
                this.timer = setTimeout(() => {
                    this.next()
                    this.play()
                }, this.autoPlayDuration)
            },
            p_clickButton(next = true) {
                this.play()
                next ? this.next() : this.prev()
            },
            p_clearTimer() {
                if (!!this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
            },
            p_clickDot(item, index) {
                this.currentValue = index
                this.update()
            },
            p_mousedown(e) {
                this.p_clearTimer()
                this.p_moving = true
                this.p_tempX = this.p_x
                this.p_startX = e.clientX
                window.document.addEventListener('mousemove', this.p_mousemove)
                window.document.addEventListener('mouseup', this.p_mouseup)
                this.$plain.$dom.enableSelectNone()
            },
            p_mousemove(e) {
                if (!this.p_moving) return
                let deltaX = e.clientX - this.p_startX;
                this.p_x = deltaX + this.p_tempX
            },
            p_mouseup(e) {
                if (!this.p_moving) return
                this.p_moving = false
                if (this.p_x > 0) {
                    this.p_x = 0
                    this.currentValue = 0
                    return
                }
                const x = -this.p_x
                for (let i = 0; i < this.data.length - 1; i++) {
                    const current = i * this.p_containerWidth
                    const next = (i + 1) * this.p_containerWidth
                    const half = (current + next) / 2
                    if (current <= x && x <= half) {
                        this.p_x = -current
                        this.currentValue = i
                        this.play()
                        return
                    }
                    if (half <= x && x <= next) {
                        this.p_x = -next
                        this.currentValue = i + 1
                        this.play()
                        return
                    }
                }
                this.p_x = -(this.data.length - 1) * this.p_containerWidth
                this.currentValue = this.data.length - 1
                this.$plain.$dom.disabledSelectNone()
                window.document.removeEventListener('mousemove', this.p_mousemove)
                window.document.removeEventListener('mouseup', this.p_mouseup)
                this.play()
            },
        }
    }
</script>

<style lang="scss">
    .pl-carousel {
        @include public-style;
        overflow: hidden;
        display: inline-block;
        position: relative;
        &, & .pl-carousel-content, & .pl-carousel-item {
            height: 100%;
            width: 100%;
        }
        .pl-carousel-content {
            @include transition-all-cubic-bezier;
            white-space: nowrap;
            position: relative;
            &.pl-carousel-content-moving {
                transition: initial;
            }
            .pl-carousel-item {
                display: inline-block;
            }
        }
        $dot-size: 9px;
        .pl-carousel-dot {
            position: absolute;
            bottom: 12px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .pl-carousel-dot-item {
                @include transition-all-cubic-bezier;
                height: $dot-size/3;
                width: $dot-size;
                border-radius: $dot-size;
                background-color: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                &:not(:last-child) {
                    margin-right: $dot-size;
                }
                &.pl-carousel-dot-item-active {
                    background-color: rgba(255, 255, 255, 1);
                    width: 2.5*$dot-size;
                }
            }
        }

        .pl-carousel-prev-button, .pl-carousel-next-button {
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
            .pl-icon {
                width: 100%;
                height: auto;
            }
            &.pl-carousel-prev-button {
                left: 0;
                background: linear-gradient(-90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
                transform: translateX(-25%);
            }
            &.pl-carousel-next-button {
                right: 0;
                background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
                transform: translateX(25%);
            }
        }

        &:hover {
            .pl-carousel-prev-button, .pl-carousel-next-button {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
</style>