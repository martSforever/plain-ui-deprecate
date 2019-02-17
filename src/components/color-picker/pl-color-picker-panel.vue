<template>
    <div class="pl-color-picker-panel">
        <pl-color-sv-picker :hue.sync="hue"/>
        <pl-color-hue-slider v-model="hue"/>
    </div>
</template>

<script>
    import PlColorHueSlider from "./pl-color-hue-slider";
    import PlColorSvPicker from "./pl-color-sv-picker";

    export default {
        name: "pl-color-picker-panel",
        components: {PlColorSvPicker, PlColorHueSlider},
        data() {
            return {
                hue: 100,
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
    }
</style>