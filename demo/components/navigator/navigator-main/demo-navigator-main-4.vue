<template>
    <div class="demo-navigator-main-4">
        <div>
            页面四,{{pageSecurity}}
        </div>
        <link-button label="打开" box-color="error"/>
        <link-button label="派发页签内事件" @click="$nav.$emit('hello','页面四数据1')"/>
        <link-button label="派发全局事件事件" @click="$nav.$emit('hello','页面四数据2',true)"/>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-4",
        data() {
            return {}
        },
    }
</script>

<style lang="scss">

</style>