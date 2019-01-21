<template>
    <lv-box class="lv-button"
            :box-color="boxColor"
            :box-shape="boxShape"
            :box-size="boxSize"
            :box-type="boxType"
            :prefix-icon="prefixIcon"
            :suffix-icon="suffixIcon"
            :clear-icon="clearIcon"
            :loading="loading"
            :icon-only="iconOnly"
            :readonly="readonly"
            :disabled="disabled"
            :padding="padding"
            :long="long"
            :width="width"
            @click="e=>$emit('click',e)"

            :class="{
                'lv-button-active':active,
            }"
    >
        <slot>
            {{label}}
        </slot>
    </lv-box>
</template>

<script>
    import LvBox from "../box/lv-box";
    import {BoxMixin} from "../../mixin/component-mixin";

    export default {
        name: "lv-button",
        components: {LvBox},
        mixins: [BoxMixin],
        props: {
            width: {default: null},                         //默认宽度自动撑开

            label: {},                                      //按钮显示的文本
            active: {type: Boolean},                        //按钮是否处于激活状态
        },
    }
</script>

<style lang="scss">
    .lv-button {
        @include transition-all;
        cursor: pointer;
        user-select: none;
        min-width: 65px;
        width: inherit;

        .lv-box-content {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:active {
            position: relative;
            top: 1px;
            left: 1px;
        }

        &.lv-box-type-fill {
            box-shadow: 1px 1px 2px 0 #999;
            @each $key, $value in $list-color {
                &.lv-box-color-#{$key} {
                    &:active {
                        background-color: mix(#000, $value, 30%);
                        border-color: mix(#000, $value, 30%);
                        &.lv-box-disabled {
                            background-color: $color-normal-disabled;
                            border-color: $color-normal-disabled;
                        }
                    }
                    &.lv-button-active {
                        background-color: mix(#000, $value, 30%);
                        border-color: mix(#000, $value, 30%);
                    }
                }
            }
        }

        &.lv-box-type-line, &.lv-box-type-none, &.lv-box-type-dashed {
            @each $key, $value in $list-color {
                &.lv-box-color-#{$key} {
                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.lv-box-disabled {
                            background-color: transparent;
                        }
                    }
                    &.lv-button-active {
                        background-color: mix(#fff, $value, 80%);
                    }
                }
            }
        }

        &.lv-box-disabled, &.lv-box-readonly {
            position: unset;
            top: unset;
            left: unset;
        }

    }
</style>