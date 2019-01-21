<template>
    <div>child:{{title}}</div>
</template>

<script>
    export default {
        name: "demo-child",
        props: {
            title: {},
        },
        mounted() {
            console.log(`child[${this.title}] mounted`)
        },
        destroyed(){
            console.log(`child[${this.title}] destroyed`)
        },
    }
</script>

<style lang="scss">

</style>