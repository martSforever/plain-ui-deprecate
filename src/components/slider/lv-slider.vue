<template>
    <div class="lv-slider" :class="p_classes">
        <div class="lv-slider-body" :style="p_bodyStyles" ref="body">
            <div class="lv-slider-progress" :style="p_progressStyles">
                <div class="lv-slider-dot-wrapper" :style="p_dotWrapperStyles" @mousedown="dragStart">
                    <div class="lv-slider-dot">
                        <div class="lv-slider-dot-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {MountedMixin, ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "lv-slider",
        mixins: [ValueMixin, MountedMixin],
        props: {
            value: {type: Number, default: 0},                          //
            color: {type: String, default: 'primary'},
            alignEnd: {type: Boolean},                                  //
            full: {type: Boolean},                                      //是否占满父元素大小
            length: {type: Number | String, default: '156px'},          //滑动条长度
            size: {type: Number | String, default: '6px'},              //滑动条宽度
            vertical: {type: Boolean},                                  //是否纵向
            step: {type: Number, default: 1},                           //滑条分块的个数，默认是不分块
            min: {type: Number, default: 0},                            //最小值
            max: {type: Number, default: 100},                          //最大值
            disabled: {type: Boolean},                                  //是否禁用
            showSteps: {type: Boolean},                                 //是否显示步骤点
            tooltip: {type: Boolean},                                   //是否tooltip显示值
            tooltipFormatter: {type: Function},                         //tooltip显示格式化函数
            range: {type: Boolean},                                     //是否为范围选择
        },
        data() {
            return {
                space: null,
                startSpace: null,
                p_touching: false,
                start: {
                    'vertical-start': 'top',
                    'vertical-end': 'bottom',
                    'horizontal-start': 'left',
                    'horizontal-end': 'right',
                },
            }
        },
        watch: {
            currentValue(newVal, oldVal) {
                if (newVal === oldVal) return
                this.space = newVal * this.totalLength
            },
            space(val) {
                this.$emit('input', Number(val / this.totalLength).toFixed(2) - 0)
            },
        },
        mounted() {
            this.space = this.currentValue * this.totalLength
        },
        computed: {
            totalLength() {
                if (!this.p_mounted) return 0
                return this.$refs.body[!!this.vertical ? 'offsetHeight' : 'offsetWidth']
            },
            p_direction() {
                return this.start[`${!!this.vertical ? 'vertical' : 'horizontal'}-${!!this.alignEnd ? 'end' : 'start'}`]
            },
            p_classes() {
                return [
                    {
                        'lv-slider-full': !!this.full,
                        'lv-slider-touching': this.p_touching,
                    },
                    `lv-slider-${!!this.vertical ? 'vertical' : 'horizontal'}`,
                    `lv-slider-align-${!!this.alignEnd ? 'end' : 'start'}`,
                    `lv-slider-color-${this.color}`,

                ]
            },
            p_bodyStyles() {
                return {
                    height: this.$plain.$utils.unit(!!this.vertical ? this.length : this.size),
                    width: this.$plain.$utils.unit(!!this.vertical ? this.size : this.length),
                }
            },
            p_dotWrapperStyles() {
                return {
                    transform: `translate${!!this.vertical ? 'Y' : 'X'}(${!!this.alignEnd ? '-' : ''}50%)`,
                }
            },
            p_progressStyles() {
                return {
                    height: !!this.vertical ? `${this.space}px` : this.$plain.$utils.unit(this.size),
                    width: !!this.vertical ? this.$plain.$utils.unit(this.size) : `${this.space}px`,
                }
            },
        },
        methods: {
            dragStart(e) {
                this.p_touching = true
                this.startSpace = this.space
                document.addEventListener('mousemove', this.dragMove)
                document.addEventListener('mouseup', this.dragEnd)
                this.startX = e.clientX
                this.startY = e.clientY
                this.$plain.$dom.enableSelectNone()
            },
            dragMove(e) {
                if (!this.p_touching) return
                const durX = e.clientX - this.startX
                const durY = e.clientY - this.startY
                this.space = Math.min(Math.max(0, this.startSpace + ((!!this.vertical ? durY : durX) * (!!this.alignEnd ? -1 : 1))), this.totalLength)
            },
            dragEnd(e) {
                if (!this.p_touching) return
                this.p_touching = false
                document.removeEventListener('mousemove', this.dragMove)
                document.removeEventListener('mouseup', this.dragEnd)
                this.$plain.$dom.disabledSelectNone()
            },
        },
    }
</script>

<style lang="scss">
    .lv-slider {
        @include public-style;
        cursor: pointer;
        display: inline-block;

        .lv-slider-body {
            display: flex;
            background-color: rgba(0, 0, 0, 0.15);
            border-radius: 100px;
            position: relative;
            .lv-slider-progress {
                border-radius: 100px;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                align-items: center;
                .lv-slider-dot {
                    height: 16px;
                    width: 16px;
                    background-color: white;
                    box-shadow: 0 0 6px #aaa;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.15s cubic-bezier(0, 1.55, 1, 1.52);
                    transform-origin: center center;
                    .lv-slider-dot-inner {
                        width: 6px;
                        height: 6px;
                        border-radius: 100px;
                    }
                }
            }
        }

        &.lv-slider-touching {
            .lv-slider-dot {
                transform: scale(1.4);
            }
        }
        .lv-slider-dot:hover{
            transform: scale(1.4);
        }

        @each $key, $value in $list-color {
            &.lv-slider-color-#{$key} {
                .lv-slider-progress {
                    &, & .lv-slider-dot-inner {
                        background-color: $value;
                    }
                }
            }
        }

        &.lv-slider-vertical {
            .lv-slider-progress {
                display: flex;
                flex-direction: column;
            }
            &.lv-slider-align-start {
                .lv-slider-progress {
                    bottom: auto;
                    justify-content: flex-end;
                }
            }
            &.lv-slider-align-end {
                .lv-slider-progress {
                    top: auto;
                    justify-content: flex-start;
                }
            }
        }
        &.lv-slider-horizontal {
            .lv-slider-progress {
                display: flex;
                flex-direction: row;
            }
            &.lv-slider-align-start {
                .lv-slider-progress {
                    right: auto;
                    justify-content: flex-end;
                }
            }
            &.lv-slider-align-end {
                .lv-slider-progress {
                    left: auto;
                    justify-content: flex-start;
                }
            }
        }
    }
</style>