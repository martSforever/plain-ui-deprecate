<template>
    <div class="pl-color-picker-panel">
        <div>
            hue:{{hue}}
        </div>
        <pl-hue-slider v-model="hue"/>
    </div>
</template>

<script>
    import PlHueSlider from "./pl-hue-slider";

    export default {
        name: "pl-color-picker-panel",
        components: {PlHueSlider},
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