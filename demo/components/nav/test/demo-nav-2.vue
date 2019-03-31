<template>
    <div class="demo-nav-2">
        <h2>页面二</h2>
        <link-button @click="back" label="返回"/>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-2",
        methods: {
            back() {
                const pages = this.$plain.$dom.findComponentUpward(this, 'pl-nav-pages')
                pages.back({wahaha: 999})
            },

            beforeBack(data) {
                console.log('beforeBack', data)
            },
        }
    }
</script>

<style lang="scss">

</style>