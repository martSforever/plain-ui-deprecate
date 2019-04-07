<template>
    <div class="pl-icon" :class="{'pl-icon-enable-hover':hover}">
        <svg class="pl-icon-svg" aria-hidden="true" @click="e=>$emit('click',e)" :class="{'pl-icon-loading':loading}">
            <use :xlink:href="`#${icon}`"></use>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "pl-icon",
        props: {
            icon: {require: true},                              //图标名称
            loading: {type: Boolean, default: false},           //是否带loading动画
            hover: {type: Boolean,},
        },
    }
</script>

<style lang="scss">
    .pl-icon {
        vertical-align: bottom;
        display: inline;
        position: relative;
        width: var(--p-icon-size);
        height: var(--p-icon-size);

        .pl-icon-svg {
            width: var(--p-icon-size);
            height: var(--p-icon-size);
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
            position: relative;

            &.pl-icon-loading {
                animation: rotating 0.65s ease infinite;
            }

            $degs: (1, 3, 4, 5, 6, 7, 8, 9, 10, 11);

            @keyframes rotating {
                from {
                    transform: rotate(0deg);
                }
                @each $item in $degs {
                    #{$item*8.33%} {
                        transform: rotate(-#{$item*30}deg);
                    }
                }
                to {
                    transform: rotate(-360deg);
                }
            }
        }

        &.pl-icon-enable-hover:hover {
            cursor: pointer;
            user-select: none;

            &:before {
                position: absolute;
                top: -4px;
                bottom: -4px;
                left: -4px;
                right: -4px;
                content: '';
                background-color: #f2f2f2;
                border-radius: 100px;
            }

            &:active {
                &:before {
                    background-color: #eae3f2;
                }
            }
        }
    }
</style>