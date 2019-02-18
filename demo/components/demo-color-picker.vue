<template>
    <div class="demo-color-picker">
        <demo-row title="颜色选择面板：启用透明度">
            <pl-color-picker-panel v-model="val" enable-alpha/>
        </demo-row>
        <demo-row title="颜色选择面板：未启用透明度">
            <pl-color-picker-panel v-model="val"/>
        </demo-row>

        <demo-row title="颜色选择器：启用透明度">
            <link-color-picker v-model="rgbValue" enable-alpha/>
            <link-color-picker v-model="rgbValue" enable-alpha/>
        </demo-row>

        <demo-row title="颜色选择器：未启用透明度">
            <link-color-picker v-model="hexVal"/>
            <link-color-picker v-model="hexVal"/>
        </demo-row>
        <demo-row title="只读">
            <link-color-picker v-model="hexVal" readonly/>
        </demo-row>
        <demo-row title="禁用">
            <link-color-picker v-model="hexVal" disabled/>
        </demo-row>
        <demo-row title="支持设置盒子样式">
            <link-color-picker v-model="hexVal" box-shape="round"/>
            <link-color-picker v-model="hexVal" box-shape="round" box-type="fill" box-color="primary"/>
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
                val: 'rgba(161,40,79,0.87)',
                hexVal: '#C73636',
                rgbValue: 'rgba(25,10,245,0.72)',
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