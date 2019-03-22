<template>
    <div class="demo-icon">
        <demo-row title="默认图标">
            <span>默认图标</span>
            <link-icon icon="pl-star"/>
        </demo-row>
        <demo-row title="自定义扩展图标">
            <link-icon icon="icon-youtubeplay"/>
        </demo-row>
        <demo-row title="loading">
            <link-icon icon="icon-loading" loading/>
        </demo-row>
        <demo-row title="hover样式">
            <span>hover样式</span>
            <link-icon icon="pl-star" hover/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-icon",
        mounted() {
            console.log('icon init');
        },
        beforeDestroy() {
            console.log('icon destroy');
        },
    }
</script>

<style lang="scss">

</style>