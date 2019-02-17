<template>
    <div class="pl-color-picker-panel">
        <div>
            <div>hue:{{color.hue}}</div>
            <div>saturation:{{color.saturation}}</div>
            <div>value:{{color.value}}</div>
            <div>opacity:{{color.opacity}}</div>
        </div>
        <pl-color-sv-picker :hue.sync="color.hue" :saturation.sync="color.saturation" :value.sync="color.value"/>
        <pl-color-hue-slider v-model="color.hue"/>
        <pl-color-opacity-slider :color="simpleColor" v-model="color.opacity"/>
        <pl-color-history :current="simpleColor"/>
    </div>
</template>

<script>
    import PlColorHueSlider from "./pl-color-hue-slider";
    import PlColorSvPicker from "./pl-color-sv-picker";
    import PlColorHistory from "./pl-color-history";
    import {hsv2rgb} from "./index";
    import PlColorOpacitySlider from "./pl-color-opacity-slider";

    export default {
        name: "pl-color-picker-panel",
        components: {PlColorOpacitySlider, PlColorHistory, PlColorSvPicker, PlColorHueSlider},
        props: {
            value: {type: String,},
        },
        data() {
            return {
                color: {
                    hue: 100,
                    saturation: 50,
                    value: 50,
                    opacity: 50,
                }
            }
        },
        computed: {
            currentRgb() {
                return hsv2rgb(this.color.hue, this.color.saturation, this.color.value)
            },
            simpleColor() {
                return `rgb(${this.currentRgb.r},${this.currentRgb.g},${this.currentRgb.b})`
            },
        },
        methods: {
            hsv2rgb,
        }
    }
</script>

<style lang="scss">
    .pl-color-picker-panel {
        @include public-style;
        display: inline-flex;
        flex-direction: column;
        width: 250px;
        & > *:not(last-child) {
            margin-bottom: 6px;
        }
    }
</style>