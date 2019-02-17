<template>
    <div class="demo-color-picker">
        <demo-row>
            <!-- :enable-alpha="true" -->
            <pl-color-picker-panel v-model="val" enable-alpha/>
            <pl-color-picker-panel v-model="val" enable-alpha/>
        </demo-row>
    </div>
</template>

<script>

    import PlColorPickerPanel from "../../src/components/color-picker/pl-color-picker-panel";


    export default {
        name: "demo-color-picker",
        components: {PlColorPickerPanel},
        data() {
            return {
                val:'#ff0000'
            }
        },
        mounted() {
        },
    }
</script>

<style lang="scss">
    .demo-color-picker {

        .box {
            width: 300px;
            height: 30px;
        }

        .hue {

            background: linear-gradient(90deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
        }

        .hsl {
            background-color: hsl(360, 100%, 40%);
        }
    }

</style>