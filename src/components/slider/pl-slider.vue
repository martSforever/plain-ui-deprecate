<template>
    <div class="pl-slider" :class="p_classes" :style="p_styles">
        <div class="pl-slider-progress" :style="p_progressStyles">
            <span class="pl-slider-dot-wrapper pl-slider-dot-wrapper-start" @mousedown="e=>dragStart(e,true)"><span class="pl-slider-dot"><span class="pl-slider-dot-inner">
                <span class="pl-slider-dot-tooltip" v-if="tooltip">{{startTooltip}}</span>
            </span></span></span>
            <span class="pl-slider-dot-wrapper pl-slider-dot-wrapper-end" @mousedown="e=>dragStart(e,false)"><span class="pl-slider-dot"><span class="pl-slider-dot-inner">
                <span class="pl-slider-dot-tooltip" v-if="tooltip">{{endTooltip}}</span>
            </span></span></span>
        </div>
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";
    import tooltip from '../../directives/tooltip'

    export default {
        name: "pl-slider",
        directives: {tooltip},
        mixins: [MountedMixin],
        props: {
            value: {type: Number, default: 0},                          //非范围选择时，双向绑定值
            start: {type: Number, default: 0},                          //范围选择时，起始绑定值
            end: {type: Number, default: 0},                            //范围选择时，末尾绑定值
            total: {type: Number, default: 100},                        //总数，value,start以及end不应该超过total
            color: {type: String, default: 'primary'},                  //颜色
            alignEnd: {type: Boolean},                                  //是否末尾对其
            full: {type: Boolean},                                      //是否占满父元素大小
            length: {type: Number | String, default: '156px'},          //滑动条长度
            size: {type: Number | String, default: '6px'},              //滑动条宽度
            vertical: {type: Boolean},                                  //是否纵向
            step: {type: Number, default: 1},                           //滑条分块的个数，默认是不分块
            min: {type: Number, default: 0},                            //最小值
            max: {type: Number, default: 100},                          //最大值
            disabled: {type: Boolean},                                  //是否禁用
            showSteps: {type: Boolean},                                 //是否显示步骤点
            tooltip: {type: Boolean, default: true},                    //是否tooltip显示值
            tooltipFormatter: {type: Function},                         //tooltip显示格式化函数
            range: {type: Boolean},                                     //是否为范围选择
        },
        data() {
            return {
                p_value: this.value || 0,
                p_start: this.start || 0,
                p_end: this.end || 0,
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
                if (val === this.p_value) return
                this.p_value = val
            },
            p_value(val) {
                this.$emit('input', (val))
            },
            start(val) {
                if (val === this.p_start) return
                this.p_start = val
            },
            p_start(val) {
                this.$emit('update:start', (val))
            },
            end(val) {
                if (val === this.p_end) return
                this.p_end = val
            },
            p_end(val) {
                this.$emit('update:end', (val))
            },
        },
        computed: {
            p_styles() {
                return {
                    [this.vertical ? 'height' : 'width']: !!this.full ? '100%' : this.$plain.$utils.unit(this.length),
                    [this.vertical ? 'width' : 'height']: this.$plain.$utils.unit(this.size),
                }
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
            totalLength() {
                if (!this.p_mounted) return 0
                return this.$el[!!this.vertical ? 'offsetHeight' : 'offsetWidth']
            },
            c_start() {
                return !!this.range ? this.transferValueToLength(this.p_start) : this.alignEnd ? (this.totalLength - this.transferValueToLength(this.p_value)) : 0
            },
            c_end() {
                return !!this.range ? this.totalLength - this.transferValueToLength(this.p_end) : this.alignEnd ? 0 : (this.totalLength - this.transferValueToLength(this.p_value))
            },
            p_progressStyles() {
                const ret = {}
                ret[this.vertical ? 'top' : 'left'] = `${this.c_start}px`
                ret[this.vertical ? 'bottom' : 'right'] = `${this.c_end}px`
                return ret
            },
            startTooltip() {
                let ret = !!this.range ? !!this.p_start : this.p_value
                return !!this.tooltipFormatter ? this.tooltipFormatter(ret) : ret
            },
            endTooltip() {
                let ret = !!this.range ? !!this.p_end : this.p_value
                return !!this.tooltipFormatter ? this.tooltipFormatter(ret) : ret
            },
        },
        methods: {
            dragStart(e, dragStart) {
                if (!!this.alignEnd !== dragStart && !this.range) return
                document.addEventListener('mousemove', this.dragMove)
                document.addEventListener('mouseup', this.dragEnd)
                this.p_dragStart = dragStart
                this.p_touching = true
                this.startX = e.clientX
                this.startY = e.clientY
                this.temp_start = this.c_start
                this.temp_end = this.c_end
                this.$plain.$dom.enableSelectNone()
            },
            dragMove(e) {
                if (!this.p_touching) return
                const durX = e.clientX - this.startX
                const durY = e.clientY - this.startY
                let temp = !!this.p_dragStart ? this.temp_start : this.temp_end
                let dur = (!!this.vertical ? durY : durX) * (!!this.p_dragStart ? 1 : -1)
                let ret = Math.min(Math.max(temp + dur, 0), this.totalLength)
                this[`p_${!!this.p_dragStart ? 'start' : 'end'}`] = this.transferLengthToValue(ret)

                if (!this.range) {
                    ret = this.transferLengthToValue(this.totalLength - ret).toFixed(2) - 0
                    this.max != null && ret > this.max && (ret = this.max)
                    this.min != null && ret < this.min && (ret = this.min)
                    this.p_value = ret
                }
                else {
                    ret = this.transferLengthToValue(this.p_dragStart ? ret : this.totalLength - ret).toFixed(2) - 0
                    this.max != null && ret > this.max && (ret = this.max)
                    this.min != null && ret < this.min && (ret = this.min)
                    if (!!this.p_dragStart) {
                        if (ret > this.p_end) ret = this.p_end
                    } else {
                        if (ret < this.p_start) ret = this.p_start
                    }
                    this[this.p_dragStart ? 'p_start' : 'p_end'] = ret
                }
            },
            dragEnd(e) {
                if (!this.p_touching) return
                this.p_touching = false
                document.removeEventListener('mousemove', this.dragMove)
                document.removeEventListener('mouseup', this.dragEnd)
                this.$plain.$dom.disabledSelectNone()
            },

            transferValueToLength(value) {
                return this.totalLength * value / this.total
            },
            transferLengthToValue(length) {
                return this.total * length / this.totalLength
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
                        position: relative;
                        .pl-slider-dot-tooltip {
                            @include transition-all;
                            opacity: 0;
                            background-color: rgba(black, 0.8);
                            color: white;
                            padding: 3px 6px;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            bottom: calc(100% + 9px);
                            border-radius: 4px;
                            font-size: 12px;
                        }
                    }
                    &:hover {
                        .pl-slider-dot-tooltip {
                            opacity: 1;
                        }
                    }
                }
            }
        }

        &.pl-slider-touching {
            .pl-slider-dot {
                transform: scale(1.4);
                .pl-slider-dot-tooltip {
                    opacity: 1 !important;
                }
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
            .pl-slider-dot-wrapper-end {
                z-index: 1;
            }
        }
        &.pl-slider-align-end {
            .pl-slider-dot-wrapper-end {
                opacity: 0;
                z-index: 0;
            }
            .pl-slider-dot-wrapper-start {
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