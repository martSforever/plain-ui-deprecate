<template>
    <div class="demo-nav-2">
        <demo-row>
            <link-button @click="back" label="返回"/>
        </demo-row>
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