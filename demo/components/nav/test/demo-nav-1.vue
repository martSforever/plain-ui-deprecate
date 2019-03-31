<template>
    <div class="demo-nav-1">
        <demo-row>
            <h2>页面一</h2>
        </demo-row>
        <demo-row>
            <link-button box-type="line" :label="`页面一参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button label="打开页面二" @click="page2"/>
            <link-button label="打开页面二参数:" box-type="line"/>
            <link-input v-model="msg"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-1",
        props: {
            nav: {},
            param: {},
        },
        data() {
            return {
                msg: null,
            }
        },
        methods: {
            page2() {
                this.nav.push({
                    path: '/nav/test/demo-nav-2',
                    param: {
                        msg: this.msg
                    }
                })
            },
        }
    }
</script>

<style lang="scss">

</style>