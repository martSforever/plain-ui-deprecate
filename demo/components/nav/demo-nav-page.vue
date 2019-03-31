<template>
    <div class="demo-nav-page">
        <demo-row>
            <div class="demo-nav-page-box">
                <link-nav-pages id="a" ref="pages" :rootPage="rootPage"/>
            </div>
        </demo-row>
        <demo-row>
            <link-button label="页面二" @click="page2"/>
        </demo-row>

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
                        name: 'page1'
                    }
                }
            }
        },
        methods: {
            page2() {
                this.$refs.pages.push({
                    path: '/nav/test/demo-nav-2',
                    param: {
                        hello: 11111
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    .demo-nav-page {
        .demo-nav-page-box {
            height: 100px;
            width: 100%;
        }
    }
</style>