<template>
    <div class="pl-collapse-group" :class="[`pl-collapse-group-shape-${shape}`]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'pl-collapse-group',
        props: {
            limit: {type: Number},
            shape: {type: String, default: 'none'},
        },
        data() {
            return {
                items: [],
                stack: [],
            };
        },
        methods: {
            p_add(collapse) {
                this.items.push(collapse);
                if (!!collapse.currentValue) {
                    this.stack.push(collapse);
                }
            },
            p_remove(collapse) {
                this.items.splice(this.items.indexOf(collapse), 1);
            },
            p_click(val, collapse) {
                if (!val) {
                    this.stack.push(collapse);
                    if (!!this.limit && this.limit > 0 && this.stack.length > this.limit) {
                        this.stack.shift().currentValue = false;
                    }
                } else {
                    this.stack.splice(this.stack.indexOf(collapse), 1);
                }
            },
        },
    };
</script>

<style lang="scss">
    .pl-collapse-group {
        @include public-style;
        display: block;
        vertical-align: middle;
        border: solid 1px $p-color-normal-background;

        .pl-collapse {
            border: none;
            &:not(:last-child) {
                border-bottom: solid 1px $p-color-normal-background;
                box-sizing: border-box;
            }
        }

    }

    /*shape*/
    @each $key, $value in $list-shape {
        &.pl-collapse-group-shape-#{$key} {
            border-radius: $value;
            overflow: hidden;
        }
    }
</style>
