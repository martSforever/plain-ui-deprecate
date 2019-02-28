<template>
    <div class="demo-navigator-main-3">
        <div>
            页面三
        </div>
        <link-button label="打开页面五" box-color="warn" @click="$nav.push('/navigator/navigator-main/demo-navigator-main-5', {hello: 111})"/>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-3"
    }
</script>

<style lang="scss">

</style>