<template>
    <div class="lv-badge">
        <slot></slot>
        <div class="lv-badge-content" :class="contentStyles">
            <slot name="badge">
                <span v-if="data!=null">{{showValue}}</span>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lv-badge",
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
                        'lv-badge-content-dot': !!this.dot,
                    },
                    `lv-badge-content-${!!this.bottom ? 'bottom' : 'top'}`,
                    `lv-badge-content-${!!this.start ? 'start' : 'end'}`,
                    `lv-badge-content-color-${this.color}`,
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
    .lv-badge {
        @include public-style;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        .lv-badge-content {
            position: absolute;
            font-size: 12px;
            padding: 2px 4px;

            @each $key, $value in $list-color {
                &.lv-badge-content-color-#{$key} {
                    background-color: $value;
                    border-radius: 100px;
                    color: white;
                }
            }

            &.lv-badge-content-top {
                top: 0;
                &.lv-badge-content-start {
                    transform: translate(-50%, -50%);
                }
                &.lv-badge-content-end {
                    transform: translate(50%, -50%);
                }
            }
            &.lv-badge-content-bottom {
                bottom: 0;
                &.lv-badge-content-start {
                    transform: translate(-50%, 50%);
                }
                &.lv-badge-content-end {
                    transform: translate(50%, 50%);
                }
            }
            &.lv-badge-content-start {
                left: 0;
            }
            &.lv-badge-content-end {
                right: 0;
            }

            &.lv-badge-content-dot {
                height: 12px;
                width: 12px;
                padding: 0;
            }
        }
    }
</style>