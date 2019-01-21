<template>
    <div class="pl-tag" :class="classes">
        {{label}}
        <slot></slot>
        <pl-icon icon="pl-close" class="pl-tag-close"/>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-tag",
        components: {PlIcon},
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
                    `pl-tag-type-${this.boxType}`,
                    `pl-tag-color-${this.boxColor}`,
                    `pl-tag-shape-${this.boxShape}`,
                    `pl-tag-size-${this.boxSize}`,
                ]
            },
        }
    }
</script>

<style lang="scss">
    .pl-tag {
        @include public-style;
        font-size: 12px;
        line-height: 12px;
        display: inline-block;
        vertical-align: middle;
        padding: 0 6px;
        cursor: pointer;
        user-select: none;
        .pl-tag-close {
            margin-left: 3px;
            position: relative;
            top: 1px;
        }

        @each $key, $value in $list-size {
            &.pl-tag-size-#{$key} {
                height: $value/1.5;
                line-height: $value/1.5;
                font-size: $value/2.5;
            }
        }

        /*fill type*/
        &.pl-tag-type-fill {
            @each $key, $value in $list-color {
                &.pl-tag-color-#{$key} {
                    background-color: $value;
                    border: solid $border-size $value;
                    color: white;

                    &:active {
                        background-color: mix(#000, $value, 30%);
                        border-color: mix(#000, $value, 30%);
                        &.pl-tag-disabled {
                            background-color: $color-normal-disabled;
                            border-color: $color-normal-disabled;
                        }
                    }
                }
            }
        }
        /*line type*/
        &.pl-tag-type-line {
            @each $key, $value in $list-color {
                &.pl-tag-color-#{$key} {
                    border: solid $border-size $value;
                    background: transparent;
                    color: $value;

                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.pl-tag-disabled {
                            background-color: transparent;
                        }
                    }
                }
            }
            &.pl-tag-dashed {
                border-style: dashed;
            }
        }
        /*none type*/
        &.pl-tag-type-none {
            @each $key, $value in $list-color {
                &.pl-tag-color-#{$key} {
                    border: solid $border-size transparent;
                    background: transparent;
                    color: mix(#000, $value, 40%);

                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.pl-tag-disabled {
                            background-color: transparent;
                        }
                    }
                }
            }
        }
        /*dash type*/
        &.pl-tag-type-dashed {
            @each $key, $value in $list-color {
                &.pl-tag-color-#{$key} {
                    border: dotted $border-size $value;
                    background: transparent;
                    color: mix(#000, $value, 40%);

                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.pl-tag-disabled {
                            background-color: transparent;
                        }
                    }
                }
            }
        }

        /*shape*/
        @each $key, $value in $list-shape {
            &.pl-tag-shape-#{$key} {
                border-radius: $value;
            }
        }
    }
</style>