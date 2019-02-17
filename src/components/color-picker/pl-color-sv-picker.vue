<template>
    <div class="pl-color-sv-picker" :style="styles">
        <div class="pl-color-sv-picker-layer pl-color-sv-picker-white"></div>
        <div class="pl-color-sv-picker-layer pl-color-sv-picker-black"></div>
        <div class="pl-color-sv-picker-layer pl-color-sv-picker-thumb-panel">
            <div class="pl-color-sv-picker-thumb-wrapper">
                <div class="pl-color-sv-picker-thumb"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {hsv2rgb} from "./index";

    export default {
        name: "pl-color-sv-picker",
        props: {
            hue: {type: Number},
            saturation: {type: Number},
            value: {type: Number},
        },
        data() {
            return {
                p_length: null,
            }
        },
        computed: {
            styles() {
                const color = hsv2rgb(this.hue, 100, 100)
                return {
                    height: `${this.p_length}px`,
                    backgroundColor: `rgb(${color.r},${color.g},${color.b})`
                }
            },
        },
        mounted() {
            this.p_length = this.$el.offsetWidth
        },
    }
</script>

<style lang="scss">
    .pl-color-sv-picker {
        width: 100%;
        position: relative;
        overflow: hidden;
        .pl-color-sv-picker-layer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .pl-color-sv-picker-white {
            background: linear-gradient(to right, white, #ffffff00);
        }
        .pl-color-sv-picker-black {
            background: linear-gradient(to top, black, #ffffff00);
        }
        .pl-color-sv-picker-thumb-panel {
            background: transparent;
            cursor: pointer;
            .pl-color-sv-picker-thumb-wrapper {
                width: 1px;
                height: 1px;
                overflow: visible;
                background-color: black;
                .pl-color-sv-picker-thumb {
                    $thumb-size: 10px;
                    height: $thumb-size;
                    width: $thumb-size;
                    background-color: white;
                    border-radius: $thumb-size;
                    box-shadow: 0 0 2px #999;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
</style>