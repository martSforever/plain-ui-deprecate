<template>
    <div class="pl-badge">
        <slot></slot>
        <div class="pl-badge-content" :class="contentStyles">
            <slot name="badge">
                <span v-if="data!=null">{{showValue}}</span>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-badge",
        props: {
            data: {},                                       //显示的数据
            bottom: {type: Boolean},                        //标记纵向是否在底部
            start: {type: Boolean},                         //标记横向是否在右边
            color: {type: String, default: 'error'},        //标记背景色
            dot: {type: Boolean,},                          //标记是否只是一个小圆点
            max: {type: Number,},                           //标记显示文本最大值
        },
        computed: {
            contentStyles() {
                return [
                    {
                        'pl-badge-content-dot': !!this.dot,
                    },
                    `pl-badge-content-${!!this.bottom ? 'bottom' : 'top'}`,
                    `pl-badge-content-${!!this.start ? 'start' : 'end'}`,
                    `pl-badge-content-color-${this.color}`,
                ]
            },
            showValue() {
                if (this.data == null) return null
                if (this.max != null && (this.data - 0) > this.max) return this.max + '+'
                return this.data
            },
        },
    }
</script>

<style lang="scss">
    .pl-badge {
        @include public-style;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        .pl-badge-content {
            position: absolute;
            font-size: 12px;
            padding: 2px 4px;

            @each $key, $value in $list-color {
                &.pl-badge-content-color-#{$key} {
                    background-color: $value;
                    border-radius: 100px;
                    color: white;
                }
            }

            &.pl-badge-content-top {
                top: 0;
                &.pl-badge-content-start {
                    transform: translate(-50%, -50%);
                }
                &.pl-badge-content-end {
                    transform: translate(50%, -50%);
                }
            }
            &.pl-badge-content-bottom {
                bottom: 0;
                &.pl-badge-content-start {
                    transform: translate(-50%, 50%);
                }
                &.pl-badge-content-end {
                    transform: translate(50%, 50%);
                }
            }
            &.pl-badge-content-start {
                left: 0;
            }
            &.pl-badge-content-end {
                right: 0;
            }

            &.pl-badge-content-dot {
                height: 12px;
                width: 12px;
                padding: 0;
            }
        }
    }
</style>