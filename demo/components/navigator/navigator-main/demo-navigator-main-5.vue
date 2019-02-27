<template>
    <div class="demo-navigator-main-5">
        <div>
            页面五
        </div>
        <link-button label="回退页面" @click="$back()"/>

        <div>
            页面六传递参数：
            <link-input v-model="msg"/>
            <link-button label="打开页面六" box-color="info" @click="$pushPage('/navigator/navigator-main/demo-navigator-main-6',{msg})"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-5",
        data() {
            return {
                msg: null,
            }
        },
    }
</script>

<style lang="scss">

</style>