<template>
    <div class="pl-color-hue-slider">
        <div class="pl-color-hue-slider-thumb" :style="thumbStyles" @mousedown="mousedown" ref="thumb"></div>
    </div>
</template>

<script>

    export default {
        name: "pl-color-hue-slider",
        props: {
            value: {type: Number, default: 0},
        },
        data() {
            return {
                p_left: 0,
                p_tempLeft: 0,
                p_dragWidth: null,
                P_startX: null,
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(val) {
                    this.$nextTick(() => this.p_left = val / 360 * this.p_dragWidth)
                },
            }
        },
        mounted() {
            this.p_dragWidth = this.$el.offsetWidth - this.$refs.thumb.offsetWidth
        },
        computed: {
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
                this.$emit('input', (this.p_left / this.p_dragWidth * 360).toFixed(0) - 0)
            },
        }
    }
</script>

<style lang="scss">
    .pl-color-hue-slider {
        background: linear-gradient(90deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
        width: 100%;
        height: 10px;
        position: relative;
        cursor: pointer;
        .pl-color-hue-slider-thumb {
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