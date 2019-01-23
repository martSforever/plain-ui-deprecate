<template>
    <div class="pl-slider" :class="p_classes" :style="p_styles">
        <div class="pl-slider-progress" :style="p_progressStyles">
            <span class="pl-slider-dot-wrapper pl-slider-dot-wrapper-start" @mousedown="e=>dragStart(e,true)"><span class="pl-slider-dot"><span class="pl-slider-dot-inner"></span></span></span>
            <span class="pl-slider-dot-wrapper pl-slider-dot-wrapper-end" @mousedown="e=>dragStart(e,false)"><span class="pl-slider-dot"><span class="pl-slider-dot-inner"></span></span></span>
        </div>
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-slider",
        mixins: [MountedMixin],
        props: {
            value: {type: Number, default: 0},                          //
            total: {type: Number, default: 1},
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
                p_value: this.value,
                p_start: null,
                p_end: null,
                p_dragStart: null,
                p_touching: false,
                temp_start: null,
                temp_end: null,

                startX: null,
                startY: null,

                position: {
                    'vertical-start': 'bottom',
                    'vertical-end': 'top',
                    'horizontal-start': 'right',
                    'horizontal-end': 'left',
                },
            }
        },
        watch: {
            value(val) {
                if (val !== this.p_value) {
                    this.p_value = val
                    this.reset()
                }
            },
            p_value(newVal) {
                if (newVal === this.value) return
                this.$emit('input', newVal)
            },
        },
        mounted() {
            this.reset()
        },
        computed: {
            p_percent() {
                return this.p_value / this.total
            },
            p_styles() {
                return {
                    [this.vertical ? 'height' : 'width']: this.$plain.$utils.unit(this.length),
                    [this.vertical ? 'width' : 'height']: this.$plain.$utils.unit(this.size),
                }
            },
            p_progressStyles() {
                const ret = {}
                ret[this.vertical ? 'top' : 'left'] = `${this.p_start}px`
                ret[this.vertical ? 'bottom' : 'right'] = `${this.p_end}px`
                return ret
            },
            totalLength() {
                if (!this.p_mounted) return 0
                return this.$el[!!this.vertical ? 'offsetHeight' : 'offsetWidth']
            },
            p_direction() {
                return this.position[`${!!this.vertical ? 'vertical' : 'horizontal'}-${!!this.alignEnd ? 'end' : 'start'}`]
            },
            p_classes() {
                return [
                    {
                        'pl-slider-full': !!this.full,
                        'pl-slider-touching': this.p_touching,
                        'pl-slider-range': this.range,
                    },
                    `pl-slider-${!!this.vertical ? 'vertical' : 'horizontal'}`,
                    `pl-slider-align-${!!this.alignEnd ? 'end' : 'start'}`,
                    `pl-slider-color-${this.color}`,

                ]
            },
        },
        methods: {
            reset() {
                this.p_start = !!this.range ? this.start : this.alignEnd ? (1 - this.p_percent) * this.totalLength : 0
                this.p_end = !!this.range ? this.end : this.alignEnd ? 0 : (1 - this.p_percent) * this.totalLength
            },
            dragStart(e, dragStart) {
                if (!!this.alignEnd !== dragStart) return
                document.addEventListener('mousemove', this.dragMove)
                document.addEventListener('mouseup', this.dragEnd)
                this.p_dragStart = dragStart
                this.p_touching = true
                this.startX = e.clientX
                this.startY = e.clientY
                this.temp_start = this.p_start
                this.temp_end = this.p_end
                this.$plain.$dom.enableSelectNone()
            },
            dragMove(e) {
                if (!this.p_touching) return
                const durX = e.clientX - this.startX
                const durY = e.clientY - this.startY
                // console.log(`p_${!!this.p_dragStart ? 'start' : 'end'}`, !!this.p_dragStart ? this.temp_start + durX : this.temp_end + durY)
                let temp = !!this.p_dragStart ? this.temp_start : this.temp_end
                let dur = (!!this.vertical ? durY : durX) * (!!this.alignEnd ? 1 : -1)
                let ret = Math.min(Math.max(temp + dur, 0), this.totalLength)
                this[`p_${!!this.p_dragStart ? 'start' : 'end'}`] = ret
                this.p_value = (this.total * (this.totalLength - ret) / this.totalLength).toFixed(2) - 0
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
    .pl-slider {
        @include public-style;
        cursor: pointer;
        display: inline-block;
        position: relative;
        background-color: rgba(black, 0.15);
        border-radius: 100px;

        .pl-slider-progress {
            border-radius: 100px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .pl-slider-dot-wrapper {
                width: 0;
                height: 0;
                overflow: visible;
                display: flex;
                align-items: center;
                justify-content: center;
                .pl-slider-dot {
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
                    .pl-slider-dot-inner {
                        width: 6px;
                        height: 6px;
                        border-radius: 100px;
                    }
                }
            }
        }

        &.pl-slider-touching {
            .pl-slider-dot {
                transform: scale(1.4);
            }
        }
        .pl-slider-dot:hover {
            transform: scale(1.4);
            transform-origin: center center;
            transition: all 0.15s cubic-bezier(0, 1.55, 1, 1.52);
        }

        @each $key, $value in $list-color {
            &.pl-slider-color-#{$key} {
                .pl-slider-progress {
                    &, & .pl-slider-dot-inner {
                        background-color: $value;
                    }
                }
            }
        }

        &.pl-slider-vertical {
            .pl-slider-progress {
                display: flex;
                flex-direction: column;
            }
        }
        &.pl-slider-horizontal {
            .pl-slider-progress {
                display: flex;
                flex-direction: row;
            }
        }

        &.pl-slider-align-start {
            .pl-slider-dot-wrapper-start {
                opacity: 0;
                z-index: 0;
            }
            .pl-slider-dot-wrapper-end{
                z-index: 1;
            }
        }
        &.pl-slider-align-end {
            .pl-slider-dot-wrapper-end {
                opacity: 0;
                z-index: 0;
            }
            .pl-slider-dot-wrapper-start{
                z-index: 1;
            }
        }
        &.pl-slider-range {
            .pl-slider-dot-wrapper {
                opacity: 1;
            }
        }
    }
</style>