<template>
    <div class="pl-progress">
        <div class="pl-progress-bar">
            <div class="pl-progress-bar-percent" :style="percentStyles" ref="percent"></div>
            <div class="pl-progress-bar-active" :style="activeStyles"></div>
        </div>
        <div>{{(currentValue*100).toFixed(2)}}%</div>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-progress",
        mixins: [ValueMixin],
        props: {
            value: {type: Number, default: 0},
        },
        watch: {
            currentValue: {
                immediate: true,
                handler(val) {
                    this.$nextTick(() => this.activeTotalWidth = this.$refs.percent.offsetWidth)
                },
            }
        },
        computed: {
            percentStyles() {
                return {
                    width: `${this.currentValue * 100}%`
                }
            },
            activeStyles() {
                return {
                    width: `${this.activeWidth}px`,
                    opacity: 1 - (this.activeWidth / this.activeTotalWidth) + 0.1
                }
            },
        },
        data() {
            return {
                activeTotalWidth: 0,
                activeWidth: 100,
                timer: null
            }
        },
        mounted() {
            this.play()
        },
        methods: {
            play() {
                this.clearTimer()
                this.timer = setInterval(() => {
                    this.activeWidth += 1
                    if (this.activeWidth > this.activeTotalWidth) {
                        this.activeWidth = 0
                    }
                }, 5)
            },
            clearTimer() {
                if (!!this.timer) {
                    clearInterval(this.timer)
                    this.timer = null
                }
            },
        }
    }
</script>

<style lang="scss">
    .pl-progress {
        @include public-style;
        width: 100%;
        height: 9px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .pl-progress-bar {
            flex: 1;
            background-color: $color-info;
            border-radius: 9px;
            height: 100%;
            margin-right: 12px;
            position: relative;
            .pl-progress-bar-percent {
                height: 100%;
                background-color: $color-primary;
                border-radius: inherit;
            }
            .pl-progress-bar-active {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                background-color: rgba(white, 0.6);
                border-radius: inherit;
            }
        }

    }
</style>