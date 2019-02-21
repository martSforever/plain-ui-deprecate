<template>
    <div class="pl-button-group" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'pl-button-group',
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
                    `pl-button-group-shape-${this.shape}`,
                    `pl-button-group-size-${this.size}`,
                    `pl-button-group-${!!this.vertical ? 'vertical' : 'horizontal'}`,
                ];
            },
        },
    };
</script>

<style lang="scss">
    .pl-button-group {
        @include public-style;
        display: inline-flex;
        box-sizing: border-box;
        &.pl-button-group-vertical {
            flex-direction: column;
            /*shape*/
            .pl-button {
                border-radius: 0;
                &:not(:first-child) {
                    border-top-color: transparent;
                }
                &.pl-box-type-fill {
                    @each $key, $value in $list-color {
                        &.pl-box-color-#{$key}:not(:last-child) {
                            border-bottom-color: mix($value, #fff, 60%);
                        }
                    }
                }
            }

            @each $key, $value in $list-shape {
                &.pl-button-group-shape-#{$key} {
                    .pl-button:first-child {
                        border-top-left-radius: $value;
                        border-top-right-radius: $value;
                    }
                    .pl-button:last-child {
                        border-bottom-left-radius: $value;
                        border-bottom-right-radius: $value;
                    }
                }
            }
        }
        &.pl-button-group-horizontal {
            flex-direction: row;
            .pl-button {
                border-radius: 0;
                &:not(:first-child) {
                    border-left-color: transparent;
                }

                &.pl-box-type-fill {
                    @each $key, $value in $list-color {
                        &.pl-box-color-#{$key}:not(:last-child) {
                            border-right-color: mix($value, #fff, 60%);
                        }
                    }
                }
            }
            /*shape*/
            @each $key, $value in $list-shape {
                &.pl-button-group-shape-#{$key} {
                    .pl-button:first-child {
                        border-top-left-radius: $value;
                        border-bottom-left-radius: $value;
                    }
                    .pl-button:last-child {
                        border-top-right-radius: $value;
                        border-bottom-right-radius: $value;
                    }
                }
            }
        }
    }
</style>
