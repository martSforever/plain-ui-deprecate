<template>
    <div class="lv-button-group" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'lv-button-group',
        props: {
            shape: {
                type: String,
                default: 'none',
            },
            size: {
                type: String,
                default: 'default',
            },
            vertical: {
                type: Boolean
            },
        },
        computed: {
            classes() {
                return [
                    `lv-button-group-shape-${this.shape}`,
                    `lv-button-group-size-${this.size}`,
                    `lv-button-group-${!!this.vertical ? 'vertical' : 'horizontal'}`,
                ];
            },
        },
    };
</script>

<style lang="scss">
    .lv-button-group {
        display: inline-flex;
        box-sizing: border-box;
        &.lv-button-group-vertical {
            flex-direction: column;
            /*shape*/
            .lv-button {
                border-radius: 0;
                &:not(:first-child) {
                    border-top-color: transparent;
                }
                &.lv-box-type-fill {
                    @each $key, $value in $list-color {
                        &.lv-box-color-#{$key}:not(:last-child) {
                            border-bottom-color: mix($value, #fff, 60%);
                        }
                    }
                }
            }

            @each $key, $value in $list-shape {
                &.lv-button-group-shape-#{$key} {
                    .lv-button:first-child {
                        border-top-left-radius: $value;
                        border-top-right-radius: $value;
                    }
                    .lv-button:last-child {
                        border-bottom-left-radius: $value;
                        border-bottom-right-radius: $value;
                    }
                }
            }
        }
        &.lv-button-group-horizontal {
            flex-direction: row;
            .lv-button {
                border-radius: 0;
                &:not(:first-child) {
                    border-left-color: transparent;
                }

                &.lv-box-type-fill {
                    @each $key, $value in $list-color {
                        &.lv-box-color-#{$key}:not(:last-child) {
                            border-right-color: mix($value, #fff, 60%);
                        }
                    }
                }
            }
            /*shape*/
            @each $key, $value in $list-shape {
                &.lv-button-group-shape-#{$key} {
                    .lv-button:first-child {
                        border-top-left-radius: $value;
                        border-bottom-left-radius: $value;
                    }
                    .lv-button:last-child {
                        border-top-right-radius: $value;
                        border-bottom-right-radius: $value;
                    }
                }
            }
        }
    }
</style>
