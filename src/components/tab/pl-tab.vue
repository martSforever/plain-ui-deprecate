<template>
    <div class="pl-tab">
        <pl-tab-header :data="['Color颜色','Icon图标','Button按钮']"/>
    </div>
</template>

<script>
    import PlTabHeader from "./pl-tab-header";

    export default {
        name: "pl-tab",
        components: {PlTabHeader}
    }
</script>

<style lang="scss">

</style>