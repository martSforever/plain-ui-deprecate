<template>
    <div class="demo-block">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "demo-block",
        created(){
            console.log(this.$el)
        },
    }
</script>

<style lang="scss">

</style>