<template>
    <link-button @click="handleClick" label="test vuex"/>
</template>

<script>
    export default {
        name: "test-vuex",
        methods: {
            handleClick() {
                console.log(this.$store)
            },
        }
    }
</script>

<style lang="scss">

</style>