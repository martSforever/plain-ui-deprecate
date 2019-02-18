<template>
    <div class="pl-color-picker">
        <pl-popover v-model="p_show" arrow disabledEqual :width="250" :height="enableAlpha?358:342" trigger="none">
            <pl-input :clearable="false" :value="currentValue">
                <pl-color :color="currentValue" :round="false" slot="append" @click="p_show = true">
                    <pl-icon icon="pl-arrow-down"/>
                </pl-color>
            </pl-input>
            <pl-color-picker-panel slot="popper" :value="currentValue" @input="p_select" :enable-alpha="enableAlpha" :format="format"/>
        </pl-popover>
    </div>
</template>

<script>
    import PlInput from "../input/pl-input";
    import PlColor from "./pl-color";
    import {ValueMixin} from "../../mixin/component-mixin";
    import PlPopover from "../popper/pl-popover";
    import PlColorPickerPanel from "./pl-color-picker-panel";
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-color-picker",
        components: {PlIcon, PlColorPickerPanel, PlPopover, PlColor, PlInput},
        mixins: [ValueMixin],
        props: {
            enableAlpha: {type: Boolean, default: true},
            format: {type: String, default: 'hex'},
        },
        data() {
            return {
                p_show: false
            }
        },
        methods: {
            p_select(val) {
                this.currentValue = val
                this.p_show = false
            },
        }
    }
</script>

<style lang="scss">
    .pl-color-picker {
        @include public-style;
        display: inline-block;
        .pl-input {
            padding-right: 0;
        }
        .pl-color {
            height: 100% !important;
        }
    }
</style>