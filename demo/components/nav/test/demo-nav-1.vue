<template>
    <div class="demo-nav-1">
        <h2>页面一</h2>
        <demo-row>
            <link-button label="打开页面二"/>
            <link-button label="页面二参数:" box-type="line" v-model="msg"/>
            <link-input/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-1",
        data() {
            return {
                msg: null,
            }
        },
        methods: {
            onBack(data) {
                console.log('onBack', data)
            },
            page2() {

            },
        }
    }
</script>

<style lang="scss">

</style>