<template>
    <transition-group :name="`lv-list-${direction}`" tag="div" class="lv-list">
        <slot></slot>
    </transition-group>
</template>

<script>
    export default {
        name: "lv-list",
        props: {
            direction: {                            //item入场出场动画 'left', 'right', 'top', 'bottom', 'left-top', 'top-left', 'right-top', 'top-right', 'left-bottom', 'bottom-left', 'right-bottom', 'bottom-right'
                type: String,
                default: 'bottom-right',
            },
        },
    }
</script>

<style lang="scss">
    .lv-item {
        @include transition-all;
    }

    .lv-list {
        display: inline-block;
    }

    $directions: (
            top:(x:0, y:-30%),
            left:(x:-80%, y:0),
            right:(x:80%, y:0),
            bottom:(x:0, y:30%),
            left-top:(x:-80%, y:-30%),
            top-left:(x:-80%, y:-30%),
            right-top:(x:80%, y:-30%),
            top-right:(x:80%, y:-30%),
            left-bottom:(x:-80%, y:30%),
            bottom-left:(x:-80%, y:30%),
            right-bottom:(x:80%, y:30%),
            bottom-right:(x:80%, y:30%),
    );

    @each $key, $value in $directions {
        .lv-list-#{$key}-enter, .lv-list-#{$key}-leave-to {
            opacity: 0;
            transform: translateX(map_get($value, x)) translateY(map_get($value, y));
        }
        .lv-list-#{$key}-leave-active {
            position: absolute;
        }
    }
</style>