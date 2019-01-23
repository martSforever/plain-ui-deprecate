<template>
    <div class="demo-slider">
        <demo-row title="基本用法">
            <link-slider v-model="val1"/>
            <link-button :label="val1"/>
            <link-slider v-model="val2" :total="100"/>
            <link-button :label="val2"/>

        </demo-row>
        <demo-row title="横向纵向，以及对其方式">
            <link-slider vertical v-model="val1"/>
            <link-slider vertical align-end v-model="val1"/>
            <link-slider v-model="val1"/>
            <link-slider v-model="val1" align-end/>
        </demo-row>
        <demo-row title="颜色">
            <link-slider v-model="val1" color="primary"/>
            <link-slider v-model="val1" color="success"/>
            <link-slider v-model="val1" color="warn"/>
            <link-slider v-model="val1" color="error"/>
            <link-slider v-model="val1" color="info"/>
        </demo-row>
        <demo-row title="范围选择">
            <link-slider range v-model="val1"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-slider",
        data() {
            return {
                val1: 0,
                val2:10,
            }
        },
    }
</script>

<style lang="scss">

</style>