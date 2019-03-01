<template>
    <div class="demo-navigator-main-2">
        <div>
            页面二
        </div>
        <link-button label="打开页面五" box-color="success" @click="$nav.push('/navigator/navigator-main/demo-navigator-main-5', {hello: 111})"/>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-2"
    }
</script>

<style lang="scss">

</style>