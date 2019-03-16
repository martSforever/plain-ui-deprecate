<template>
    <textarea class="pl-textarea"
              :cols="cols"
              :rows="rows"
              :class="classes"
              v-model="currentValue"
              :readonly="readonly"
              :disabled="disabled">
    </textarea>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-textarea",
        mixins: [ValueMixin],
        props: {
            cols: {type: Number, default: 30},
            rows: {type: Number, default: 5},
            color: {type: String, default: 'primary'},
            shape: {type: String, default: 'none'},
            readonly: {type: Boolean},
            disabled: {type: Boolean},
        },
        computed: {
            classes() {
                return [
                    `pl-textarea-color-${this.color}`,
                    `pl-textarea-shape-${this.shape}`,
                ]
            },
        },
    }
</script>

<style lang="scss">
    .pl-textarea {
        @include public-style;
        display: inline-block;
        padding: 6px;
        box-sizing: border-box;
        outline: none;
        letter-spacing: 1px;
        border: solid 1px $color-info;
        font-size: 12px;

        @each $key, $color in $list-color {
            &.pl-textarea-color-#{$key}:focus {
                border-color: $color;
            }
        }
        @each $key, $value in $list-shape {
            &.pl-textarea-color-#{$key}:focus {
                border-radius: $value;
            }
        }
    }
</style>