<template>
    <div class="demo-textarea">
        <demo-row :title="`基本用法：${val[1]}`">
            <link-textarea v-model="val[1]"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-textarea",
        data() {
            return {
                val: {}
            }
        },
    }
</script>

<style lang="scss">

</style>