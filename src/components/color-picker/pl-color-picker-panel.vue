<template>
    <div class="pl-color-picker-panel">
        <div>
            <div>hue:{{color.hue}}</div>
            <div>saturation:{{color.saturation}}</div>
            <div>value:{{color.value}}</div>
        </div>
        <pl-color-sv-picker :hue.sync="color.hue" :saturation.sync="color.saturation" :value.sync="color.value"/>
        <pl-color-hue-slider v-model="color.hue"/>
        <pl-color-history :current="`rgb(${currentRgb.r},${currentRgb.g},${currentRgb.b})`"/>
    </div>
</template>

<script>
    import PlColorHueSlider from "./pl-color-hue-slider";
    import PlColorSvPicker from "./pl-color-sv-picker";
    import PlColorHistory from "./pl-color-history";
    import {hsv2rgb} from "./index";

    export default {
        name: "pl-color-picker-panel",
        components: {PlColorHistory, PlColorSvPicker, PlColorHueSlider},
        props: {
            value: {type: String,},
        },
        data() {
            return {
                color: {
                    hue: 100,
                    saturation: 0,
                    value: 0,
                }
            }
        },
        computed: {
            currentRgb() {
                return hsv2rgb(this.color.hue, this.color.saturation, this.color.value)
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