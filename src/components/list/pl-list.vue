<template>
    <transition-group :name="`pl-list-move-${direction}`" tag="div" class="pl-list">
        <slot></slot>
    </transition-group>
</template>

<script>
    export default {
        name: "pl-list",
        props: {
            direction: {                            //item入场出场动画 'left', 'right', 'top', 'bottom', 'left-top', 'top-left', 'right-top', 'top-right', 'left-bottom', 'bottom-left', 'right-bottom', 'bottom-right'
                type: String,
                default: 'bottom-right',
                
            },
        },
    }
</script>

<style lang="scss">
    .pl-item {
        @include transition-all;
    }

    .pl-list {
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
        .pl-list-move-#{$key}-enter, .pl-list-move-#{$key}-leave-to {
            opacity: 0;
            transform: translateX(map_get($value, x)) translateY(map_get($value, y));
        }
        .pl-list-move-#{$key}-leave-active {
            position: absolute;
        }
    }
</style>