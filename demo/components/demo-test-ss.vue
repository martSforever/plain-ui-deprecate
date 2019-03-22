<template>
    <div class="demo-test-ss">
        <slot :row="data">
            {{data.name}}
        </slot>
    </div>
</template>

<script>
    export default {
        name: "demo-test-ss",
        data() {
            return {
                data: {name: 'vue'}
            }
        },
        mounted() {
            console.log(this.$scopedSlots)
        },
    }
</script>

<style lang="scss">

</style>