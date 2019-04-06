<template>
    <div class="pl-progress">
        <div class="pl-progress-bar">
            <div class="pl-progress-bar-percent" :style="percentStyles" :class="percentClasses" ref="percent"></div>
            <div class="pl-progress-bar-active" :style="activeStyles"></div>
        </div>
        <div class="pl-progress-label">{{showLabel}}</div>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-progress",
        mixins: [ValueMixin],
        props: {
            value: {type: Number, default: 0},
            status: {type: String, default: 'normal'},
        },
        watch: {
            currentValue: {
                immediate: true,
                handler(val) {
                    this.$nextTick(() => this.activeTotalWidth = this.$refs.percent.offsetWidth)
                },
            },
            status(val) {
                if (val !== this.p_status) this.p_status = val
            },
            p_status(val) {
                this.$emit('update:status', val)
            },
        },
        computed: {
            percentClasses() {
                return [
                    `pl-progress-bar-percent-${this.finalStatus}`
                ]
            },
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
            isComplete() {
                return Math.abs(this.currentValue - 1) < 0.01
            },
            showLabel() {
                if (this.finalStatus === 'success') return '成功'
                if (this.finalStatus === 'error') return '失败'
                return (this.currentValue * 100).toFixed(2) + '%'
            },
            finalStatus() {
                if (this.$plain.$utils.oneOf(this.p_status, ['success', 'error'])) return this.p_status
                if (this.isComplete) return 'success'
                return 'normal'
            },
        },
        data() {
            return {
                p_status: this.status,
                activeTotalWidth: 0,
                activeWidth: 100,
                timer: null,
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
                }, 10)
            },
            changeStatus(status) {
                this.p_status = status
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
            background-color: var(--p-color-info);
            border-radius: 9px;
            height: 100%;
            position: relative;
            .pl-progress-bar-percent {
                height: 100%;
                border-radius: inherit;
                @include transition-all;
                &.pl-progress-bar-percent-normal {
                    background-color: var(--p-color-primary);
                }
                &.pl-progress-bar-percent-success {
                    background-color: var(--p-color-success);
                }
                &.pl-progress-bar-percent-error {
                    background-color: var(--p-color-error);
                }
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

        .pl-progress-label {
            width: 60px;
            text-align: right;
        }
    }
</style>