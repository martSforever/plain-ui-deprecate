<template>
    <div class="pl-color-picker-panel">
        <!--<div>
            <div>hue:{{color.hue}}</div>
            <div>saturation:{{color.saturation}}</div>
            <div>value:{{color.value}}</div>
            <div>alpha:{{color.alpha}}</div>
            <div>hex:{{color.hex}}</div>
            <div>color:{{color.color}}</div>
            <div>_value:{{color._value}}</div>
        </div>-->
        <pl-color-sv-picker :hue.sync="color.hue" :saturation.sync="color.saturation" :value.sync="color.value" @change="color.updateByHsv()"/>
        <pl-color-hue-slider v-model="color.hue" @change="color.updateByHsv()"/>
        <pl-color-alpha-slider :color="color.hex" v-model="color.alpha" v-if="color.enableAlpha" @change="color.updateByAlpha()"/>
        <pl-color-history :current="color.color" ref="history" @select="p_selectHistory"/>
        <div class="pl-color-picker-panel-operate">
            <pl-input :value="color._value" :width="178" @enter="p_enter" @clear="val=>color._value = null" keyboard box-shape="round"/>
            <pl-button label="确定" box-shape="round" @click="p_confirm"/>
        </div>
    </div>
</template>

<script>
    import PlColorHueSlider from "./pl-color-hue-slider";
    import PlColorSvPicker from "./pl-color-sv-picker";
    import PlColorHistory from "./pl-color-history";
    import {Color} from "./index";
    import PlInput from "../input/pl-input";
    import PlButton from "../button/pl-button";
    import PlButtonGroup from "../button/pl-button-group";
    import {ValueMixin} from "../../mixin/component-mixin";
    import PlColorAlphaSlider from "./pl-color-alpha-slider";

    export default {
        name: "pl-color-picker-panel",
        components: {PlColorAlphaSlider, PlButtonGroup, PlButton, PlInput, PlColorHistory, PlColorSvPicker, PlColorHueSlider},
        mixins: [ValueMixin],
        props: {
            enableAlpha: {type: Boolean},
            format: {type: String},
        },
        watch: {
            value(val) {
                this.color.updateByString(val, true, this.enableAlpha)
            },
        },
        data() {
            const color = new Color(this.value, this.enableAlpha, this.format)
            return {
                color,
            }
        },
        methods: {
            update(val) {
                this.color.updateByString(val === '' ? null : val)
            },
            p_confirm() {
                // this.$message.show(this.color.color)
                this.currentValue = this.color.color
                this.$refs.history.save(this.color.color)
            },
            p_enter(e) {
                const val = e.target.value
                this.color.updateByString(val === '' ? null : val)
            },
            p_selectHistory(color) {
                this.color.updateByString(color)
            },
        }
    }
</script>