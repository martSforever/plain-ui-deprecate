<template>
    <div class="demo-nav-page">
        <link-nav-pages id="a" ref="pages" :rootPage="rootPage"/>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-page",
        data() {
            return {
                rootPage: {
                    path: '/nav/test/demo-nav-1.vue',
                    param: {
                        msg: 'page1'
                    }
                }
            }
        },
        methods: {}
    }
</script>

<style lang="scss">
    .demo-nav-page {
        height: 100%;
        width: 100%;
    }
</style>