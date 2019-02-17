<template>
    <div class="pl-color-picker-panel">
        <div>
            hue:{{hue}}
        </div>
        <div style="width: 250px;height: 250px" :style="hsvStyle"></div>
        <pl-color-hue-slider v-model="hue"/>
    </div>
</template>

<script>
    import {hsv2rgb} from "./index";
    import PlColorHueSlider from "./pl-color-hue-slider";

    export default {
        name: "pl-color-picker-panel",
        components: {PlColorHueSlider},
        data() {
            return {
                hue: 100,
            }
        },
        computed: {
            hsvStyle() {
                const color = hsv2rgb(this.hue, 100, 100)
                return {
                    backgroundColor: `rgb(${color.r},${color.g},${color.b})`
                }
            },
        },
    }
</script>

<style lang="scss">
    .pl-color-picker-panel {
        @include public-style;
        display: inline-flex;
        flex-direction: column;
        width: 250px;
    }
</style>