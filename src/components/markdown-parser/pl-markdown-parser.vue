<template>
    <div class="pl-markdown-parser">
        pl-markdown-parser
    </div>
</template>

<script>
    export default {
        name: "pl-markdown-parser",
        props: {
            value: {},
        },
        watch: {
            value: {
                immediate: true,
                handler(val) {
                    this.p_decodeValue()
                },
            },
        },
        methods: {
            p_decodeValue() {
                console.log(this.value)
            },
        },
    }
</script>

<style lang="scss">

</style>