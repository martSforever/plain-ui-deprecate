<template>
    <div class="demo-rate">
        <demo-row title="基本用法">
            <link-rate v-model="val1"/>
            <link-slider v-model="val1" :total="5"/>
            <link-button>val1:{{val1}}</link-button>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-rate",
        data() {
            return {
                val1: 2.5,
            }
        },
    }
</script>

<style lang="scss">

</style>