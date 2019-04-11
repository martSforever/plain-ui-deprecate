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