<template>
    <div class="pl-color-opacity-slider" :style="styles">
        <div class="pl-color-opacity-slider-shadow" :style="shadowStyles"></div>
    </div>
</template>

<script>
    export default {
        name: "pl-color-opacity-slider",
        props: {
            color: {},
            opacity: {},
        },
        data() {
            return {
                backgroundImage: require('src/asserts/opacity.png')
            }
        },
        computed: {
            styles() {
                return {
                    backgroundImage: `url(${this.backgroundImage})`
                }
            },
            shadowStyles() {
                return {
                    background: `linear-gradient(to left, ${this.color}, #ffffff00)`,
                }
            },
        },
    }
</script>

<style lang="scss">
    .pl-color-opacity-slider {
        width: 100%;
        height: 10px;
        position: relative;
        cursor: pointer;
        background-size: 10px 10px;
        .pl-color-opacity-slider-shadow {
            height: 100%;
        }
    }
</style>