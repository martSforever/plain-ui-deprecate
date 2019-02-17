<template>
    <div class="pl-color-picker-panel">
        <div>
            <div>hue:{{color.hue}}</div>
            <div>saturation:{{color.saturation}}</div>
            <div>value:{{color.value}}</div>
            <div>alpha:{{color.alpha}}</div>
            <div>hex:{{color.hex}}</div>
            <div>color:{{color.color}}</div>
            <div>_value:{{color._value}}</div>
        </div>
        <pl-color-sv-picker :hue.sync="color.hue" :saturation.sync="color.saturation" :value.sync="color.value" @change="color.updateByHsv()"/>
        <pl-color-hue-slider v-model="color.hue" @change="color.updateByHsv()"/>
        <pl-color-opacity-slider :color="color.color" v-model="color.alpha" v-if="color.enableAlpha"/>
        <pl-color-history :current="color.color"/>
        <div class="pl-color-picker-panel-operate">
            <pl-input :value="color._value" :width="195" @input="val=>color.updateByString(val,false)"/>
            <pl-button label="确认"/>
        </div>
    </div>
</template>

<script>
    import PlColorHueSlider from "./pl-color-hue-slider";
    import PlColorSvPicker from "./pl-color-sv-picker";
    import PlColorHistory from "./pl-color-history";
    import {Color} from "./index";
    import PlColorOpacitySlider from "./pl-color-opacity-slider";
    import PlInput from "../input/pl-input";
    import PlButton from "../button/pl-button";
    import PlButtonGroup from "../button/pl-button-group";

    export default {
        name: "pl-color-picker-panel",
        components: {PlButtonGroup, PlButton, PlInput, PlColorOpacitySlider, PlColorHistory, PlColorSvPicker, PlColorHueSlider},
        props: {
            value: {type: String,},
            enableAlpha: {type: Boolean,},
            format: {type: String, default: 'hex'},
        },
        data() {
            const color = new Color(this.value, this.enableAlpha, this.format)
            return {
                color,
            }
        },
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
        .pl-color-picker-panel-operate {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .pl-button {
                min-width: initial;
                padding: 0 12px;
            }
        }
    }
</style>