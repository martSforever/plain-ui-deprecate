<template>
    <div class="pl-tab-header">
        <div class="pl-tab-header-item" v-for="(item,index) in data" :key="index">
            {{item}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-tab-header",
        props: {
            data: {type: Array, default: () => []}
        },
    }
</script>

<style lang="scss">

</style>