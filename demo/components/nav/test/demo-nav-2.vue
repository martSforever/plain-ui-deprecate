<template>
    <div class="demo-nav-2">
        <h2>页面二</h2>
        <demo-row>
            <link-button box-type="line" :label="`页面一参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button @click="back" label="返回"/>
            <link-button box-type="line" label="回退参数"/>
            <link-input v-model="ret"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-2",
        props: {
            param: {},
            nav: {},
        },
        data() {
            return {
                ret: null
            }
        },
        methods: {
            back() {
                // const pages = this.$plain.$dom.findComponentUpward(this, 'pl-nav-pages')
                // pages.back({wahaha: 999})
                // console.log()
                this.nav.back(this.ret)
            },
            beforeBack(data) {
                // console.log('beforeBack', data)
            },
        }
    }
</script>

<style lang="scss">

</style>