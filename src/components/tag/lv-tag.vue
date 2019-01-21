<template>
    <div class="lv-tag" :class="classes">
        {{label}}
        <slot></slot>
        <lv-icon icon="lv-close" class="lv-tag-close"/>
    </div>
</template>

<script>
    import LvIcon from "../icon/lv-icon";

    export default {
        name: "lv-tag",
        components: {LvIcon},
        props: {
            label: {type: String},                                          //显示的文本

            boxType: {type: String, default: 'fill',},                      //盒子类型
            boxColor: {type: String, default: 'primary'},                   //盒子颜色
            boxShape: {type: String, default: 'none'},                      //盒子形状
            boxSize: {type: String, default: 'default'},                    //盒子大小
        },
        computed: {
            classes() {
                return [
                    `lv-tag-type-${this.boxType}`,
                    `lv-tag-color-${this.boxColor}`,
                    `lv-tag-shape-${this.boxShape}`,
                    `lv-tag-size-${this.boxSize}`,
                ]
            },
        }
    }
</script>

<style lang="scss">
    .lv-tag {
        @include public-style;
        font-size: 12px;
        line-height: 12px;
        display: inline-block;
        vertical-align: middle;
        padding: 0 6px;
        cursor: pointer;
        user-select: none;
        .lv-tag-close {
            margin-left: 3px;
            position: relative;
            top: 1px;
        }

        @each $key, $value in $list-size {
            &.lv-tag-size-#{$key} {
                height: $value/1.5;
                line-height: $value/1.5;
                font-size: $value/2.5;
            }
        }

        /*fill type*/
        &.lv-tag-type-fill {
            @each $key, $value in $list-color {
                &.lv-tag-color-#{$key} {
                    background-color: $value;
                    border: solid $border-size $value;
                    color: white;

                    &:active {
                        background-color: mix(#000, $value, 30%);
                        border-color: mix(#000, $value, 30%);
                        &.lv-tag-disabled {
                            background-color: $color-normal-disabled;
                            border-color: $color-normal-disabled;
                        }
                    }
                }
            }
        }
        /*line type*/
        &.lv-tag-type-line {
            @each $key, $value in $list-color {
                &.lv-tag-color-#{$key} {
                    border: solid $border-size $value;
                    background: transparent;
                    color: $value;

                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.lv-tag-disabled {
                            background-color: transparent;
                        }
                    }
                }
            }
            &.lv-tag-dashed {
                border-style: dashed;
            }
        }
        /*none type*/
        &.lv-tag-type-none {
            @each $key, $value in $list-color {
                &.lv-tag-color-#{$key} {
                    border: solid $border-size transparent;
                    background: transparent;
                    color: mix(#000, $value, 40%);

                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.lv-tag-disabled {
                            background-color: transparent;
                        }
                    }
                }
            }
        }
        /*dash type*/
        &.lv-tag-type-dashed {
            @each $key, $value in $list-color {
                &.lv-tag-color-#{$key} {
                    border: dotted $border-size $value;
                    background: transparent;
                    color: mix(#000, $value, 40%);

                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.lv-tag-disabled {
                            background-color: transparent;
                        }
                    }
                }
            }
        }

        /*shape*/
        @each $key, $value in $list-shape {
            &.lv-tag-shape-#{$key} {
                border-radius: $value;
            }
        }
    }
</style>