<template>
    <div class="pl-color-opacity-slider" :style="styles" @mousedown="mousedown">
        <div class="pl-color-opacity-slider-shadow" :style="shadowStyles"></div>
        <div class="pl-color-opacity-slider-thumb" :style="thumbStyles" ref="thumb"></div>
    </div>
</template>

<script>
    export default {
        name: "pl-color-opacity-slider",
        props: {
            color: {},
            value: {type: Number, default: 0},
        },
        watch: {
            value: {
                immediate: true,
                handler(val) {
                    this.$nextTick(() => this.p_left = val / 100 * this.p_dragWidth)
                },
            },
        },
        data() {
            return {
                backgroundImage: require('src/asserts/opacity.png'),
                p_left: 0,
                p_tempLeft: 0,
                p_dragWidth: null,
                p_thumbWidth: null,
                p_startX: null,
            }
        },
        mounted() {
            this.p_dragWidth = this.$el.offsetWidth - this.$refs.thumb.offsetWidth
            this.p_thumbWidth = this.$refs.thumb.offsetWidth
        },
        computed: {
            styles() {
                return {
                    backgroundImage: `url(${this.backgroundImage})`
                }
            },
            shadowStyles() {
                return {
                    background: `linear-gradient(to left, ${this.color}, #ffffff00)`,
                }
            },
            thumbStyles() {
                return {
                    left: `${this.p_left}px`
                }
            },
        },
        methods: {
            mousedown(e) {
                document.body.addEventListener('mousemove', this.mousemove)
                document.body.addEventListener('mouseup', this.mouseup)
                if (e.target === this.$el) {
                    this.p_left = e.offsetX - this.p_thumbWidth / 2
                    this.emitValue()
                }
                this.$plain.$dom.enableSelectNone()
                this.p_startX = e.clientX
                this.p_tempLeft = this.p_left
            },
            mousemove(e) {
                const durX = e.clientX - this.p_startX
                this.p_left = Math.min(this.p_dragWidth, Math.max(0, this.p_tempLeft + durX))
                this.emitValue()
            },
            mouseup(e) {
                document.body.removeEventListener('mousemove', this.mousemove)
                document.body.removeEventListener('mouseup', this.mouseup)
                this.$plain.$dom.disabledSelectNone()
            },
            emitValue() {
                this.$emit('input', (this.p_left / this.p_dragWidth * 100).toFixed(0) - 0)
            },
        }
    }
</script>

<style lang="scss">
    .pl-color-opacity-slider {
        width: 100%;
        height: 10px;
        position: relative;
        cursor: pointer;
        background-size: 10px 10px;
        .pl-color-opacity-slider-shadow {
            height: 100%;
        }
        .pl-color-opacity-slider-thumb {
            display: inline-block;
            height: 100%;
            width: 8px;
            background-color: white;
            position: absolute;
            top: 0;
            border: solid 1px $color-info;
            box-sizing: border-box;
        }
    }
</style>