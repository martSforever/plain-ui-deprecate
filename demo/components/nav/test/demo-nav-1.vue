<template>
    <div class="demo-nav-1">
        <h2>页面一</h2>
        demo-nav-1
    </div>
</template>

<script>
    export default {
        name: "demo-nav-1",
        methods: {
            onBack(data) {
                console.log('onBack', data)
            },
        }
    }
</script>

<style lang="scss">

</style>