<template>
    <pl-box class="pl-button"
            v-bind="boxBinding"
            @click="e=>$emit('click',e)"
            :class="{
                'pl-button-active':active,
            }">
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

            loadingType: {default: 'section-one'},
        },
    }
</script>

<style lang="scss">
    .pl-button {
        @include transition-all;
        cursor: pointer;
        user-select: none;
        min-width: 65px;
        margin: 0;

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
                        background-color: var(--p-color-#{$key}-deep);
                        border-color: var(--p-color-#{$key}-deep);

                        &.pl-box-disabled {
                            background-color: var(--p-color-normal-disabled);
                            border-color: var(--p-color-normal-disabled);
                        }
                    }

                    &.pl-button-active {
                        background-color: var(--p-color-#{$key}-deep);
                        border-color: var(--p-color-#{$key}-deep);
                    }
                }
            }
        }

        &.pl-box-type-line, &.pl-box-type-none, &.pl-box-type-dashed {
            @each $key, $value in $list-color {
                &.pl-box-color-#{$key} {
                    &:active {
                        background-color: var(--p-color-#{$key}-light);

                        &.pl-box-disabled {
                            background-color: transparent;
                        }
                    }

                    &.pl-button-active {
                        background-color: var(--p-color-#{$key}-light);
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