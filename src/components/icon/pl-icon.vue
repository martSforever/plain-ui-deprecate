<template>
    <svg class="pl-icon" aria-hidden="true" @click="e=>$emit('click',e)" :class="{'pl-icon-loading':loading}">
        <use :xlink:href="`#${icon}`"></use>
    </svg>
</template>

<script>
    export default {
        name: "pl-icon",
        props: {
            icon: {require: true},                              //图标名称
            loading: {type: Boolean, default: false},           //是否带loading动画
        },
    }
</script>

<style lang="scss">
    .pl-icon {
        width: $icon-size;
        height: $icon-size;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        position: relative;

        &.pl-icon-loading {
            animation: rotating 1s linear infinite;
        }

        @keyframes rotating {
            from {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(180deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
</style>