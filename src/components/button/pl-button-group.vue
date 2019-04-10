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