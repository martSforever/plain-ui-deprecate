<template>
    <pl-box class="pl-button"
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
                'pl-button-active':active,
            }"
    >
        <slot>
            {{label}}
        </slot>
    </pl-box>
</template>

<script>
    import PlBox from "../box/pl-box";
    import {BoxMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-button",
        components: {PlBox},
        mixins: [BoxMixin],
        props: {
            width: {default: null},                         //默认宽度自动撑开

            label: {},                                      //按钮显示的文本
            active: {type: Boolean},                        //按钮是否处于激活状态
        },
    }
</script>

<style lang="scss">
    .pl-button {
        @include transition-all;
        cursor: pointer;
        user-select: none;
        min-width: 65px;

        .pl-box-content {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:active {
            position: relative;
            top: 1px;
            left: 1px;
        }

        &.pl-box-type-fill {
            box-shadow: 1px 1px 2px 0 #999;
            @each $key, $value in $list-color {
                &.pl-box-color-#{$key} {
                    &:active {
                        background-color: mix(#000, $value, 30%);
                        border-color: mix(#000, $value, 30%);
                        &.pl-box-disabled {
                            background-color: $color-normal-disabled;
                            border-color: $color-normal-disabled;
                        }
                    }
                    &.pl-button-active {
                        background-color: mix(#000, $value, 30%);
                        border-color: mix(#000, $value, 30%);
                    }
                }
            }
        }

        &.pl-box-type-line, &.pl-box-type-none, &.pl-box-type-dashed {
            @each $key, $value in $list-color {
                &.pl-box-color-#{$key} {
                    &:active {
                        background-color: mix(#fff, $value, 80%);
                        &.pl-box-disabled {
                            background-color: transparent;
                        }
                    }
                    &.pl-button-active {
                        background-color: mix(#fff, $value, 80%);
                    }
                }
            }
        }

        &.pl-box-disabled, &.pl-box-readonly {
            position: unset;
            top: unset;
            left: unset;
        }

    }
</style>